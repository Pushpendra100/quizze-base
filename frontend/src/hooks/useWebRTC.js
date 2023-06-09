import { useEffect, useState, useRef, useCallback } from 'react';
import { ACTIONS } from '../actions';
import socketInit from '../socket';
import freeice from 'freeice';
import { useStateWithCallback } from './useStateWithCallback';

export const useWebRTC = (roomId, user) => {
    const [clients, setClients] = useStateWithCallback([]);
    const audioElements = useRef({});
    const connections = useRef({});
    const socket = useRef(null);
    const localMediaStream = useRef(null);
    const clientsRef = useRef(null);

    const addNewClient = useCallback((newClient, cb) => {
        const lookingFor = clients.find((client) => client.id === newClient.id);

        if (lookingFor === undefined) {
            setClients((existingClients) => [...existingClients, newClient],cb);
        }
        },
        [clients, setClients]
    );

    useEffect(() => {
        clientsRef.current = clients;
    }, [clients]);

    useEffect(() => {
        const initChat = async () => {
            socket.current = socketInit();
            await captureMedia();
            addNewClient({ ...user, muted: true }, () => {
                const localElement = audioElements.current[user.id];
                if (localElement) {
                    localElement.volume = 0;
                    localElement.srcObject = localMediaStream.current;
                }
            });
            socket.current.on(ACTIONS.MUTE_INFO, ({ userId, isMute }) => {
                handleSetMute(isMute, userId);
            });

            socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);
            socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
            socket.current.on(ACTIONS.ICE_CANDIDATE, handleIceCandidate);
            socket.current.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);
            socket.current.on(ACTIONS.MUTE, ({ peerId, userId }) => {
                handleSetMute(true, userId);
            });
            socket.current.on(ACTIONS.UNMUTE, ({ peerId, userId }) => {
                handleSetMute(false, userId);
            });
            socket.current.emit(ACTIONS.JOIN, {
                roomId,
                user,
            });

            async function captureMedia (){
                localMediaStream.current =
                    await navigator.mediaDevices.getUserMedia({
                        audio: true,
                    });
            };

            async function handleNewPeer({peerId,createOffer,user: remoteUser}){
                if (peerId in connections.current) {
                    return console.warn(`You are already connected with ${peerId} (${user.name})`);
                }
                connections.current[peerId] = new RTCPeerConnection({
                    iceServers: freeice(),
                });

                connections.current[peerId].onicecandidate = (event) => {
                    socket.current.emit(ACTIONS.RELAY_ICE, {
                        peerId,
                        icecandidate: event.candidate,
                    });
                };

                connections.current[peerId].ontrack = ({streams: [remoteStream]}) => {
                    addNewClient({ ...remoteUser, muted: true }, () => {
                        const currentUser = clientsRef.current.find(
                            (client) => client._id === user._id
                        );
                        if(currentUser){
                            socket.current.emit(ACTIONS.MUTE_INFO, {
                                userId: user._id,
                                roomId,
                                isMute: currentUser.muted,
                            });
                        }
                        if(audioElements.current[remoteUser._id]){
                            audioElements.current[remoteUser._id].srcObject =
                                remoteStream;
                        }else{
                            let settled = false;
                            const interval = setInterval(() => {
                                if(audioElements.current[remoteUser._id]) {
                                    audioElements.current[remoteUser._id].srcObject = remoteStream;
                                    settled = true;
                                }
                                if(settled){
                                    clearInterval(interval);
                                }
                            }, 300);
                        }
                    });
                };

                localMediaStream.current.getTracks().forEach((track) => {
                    connections.current[peerId].addTrack(
                        track,
                        localMediaStream.current
                    );
                });
                if(createOffer){
                    const offer = await connections.current[peerId].createOffer();
                    await connections.current[peerId].setLocalDescription(
                        offer
                    );
                    socket.current.emit(ACTIONS.RELAY_SDP, {
                        peerId,
                        sessionDescription: offer,
                    });
                }
            };

            async function handleRemovePeer({ peerId, userId }){
                if (connections.current[peerId]) {
                    connections.current[peerId].close();
                }

                delete connections.current[peerId];
                delete audioElements.current[peerId];
                setClients((list) => list.filter((c) => c._id !== userId));
            };

            async function handleIceCandidate ({ peerId, icecandidate }){
                if (icecandidate) {
                    connections.current[peerId].addIceCandidate(icecandidate);
                }
            };
            async function setRemoteMedia ({peerId,sessionDescription: remoteSessionDescription}){
                connections.current[peerId].setRemoteDescription(
                    new RTCSessionDescription(remoteSessionDescription)
                );

                if (remoteSessionDescription.type === 'offer') {
                    const connection = connections.current[peerId];

                    const answer = await connection.createAnswer();
                    connection.setLocalDescription(answer);

                    socket.current.emit(ACTIONS.RELAY_SDP, {
                        peerId,
                        sessionDescription: answer,
                    });
                }
            }
            async function handleSetMute (mute, userId){
                const clientIdx = clientsRef.current.map((client) => client._id).indexOf(userId);
                const allConnectedClients = JSON.parse(
                    JSON.stringify(clientsRef.current)
                );
                if (clientIdx > -1) {
                    allConnectedClients[clientIdx].muted = mute;
                    setClients(allConnectedClients);
                }
            }
        };

        initChat();
        return () => {
            localMediaStream.current.getTracks().forEach((track) => track.stop());
            socket.current.emit(ACTIONS.LEAVE, { roomId });
            for (let peerId in connections.current) {
                connections.current[peerId].close();
                delete connections.current[peerId];
                delete audioElements.current[peerId];
            }
            socket.current.off(ACTIONS.ADD_PEER);
            socket.current.off(ACTIONS.REMOVE_PEER);
            socket.current.off(ACTIONS.ICE_CANDIDATE);
            socket.current.off(ACTIONS.SESSION_DESCRIPTION);
            socket.current.off(ACTIONS.MUTE);
            socket.current.off(ACTIONS.UNMUTE);
        };
    }, []);

    const provideRef = (instance, userId) => {
        audioElements.current[userId] = instance;
    };

    const handleMute = (isMute, userId) => {
        let settled = false;

        if (userId === user._id) {
            let interval = setInterval(() => {
                if (localMediaStream.current) {
                    localMediaStream.current.getTracks()[0].enabled = !isMute;
                    if (isMute) {
                        socket.current.emit(ACTIONS.MUTE, {
                            roomId,
                            userId: user._id,
                        });
                    } else {
                        socket.current.emit(ACTIONS.UNMUTE, {
                            roomId,
                            userId: user._id,
                        });
                    }
                    settled = true;
                }
                if (settled) {
                    clearInterval(interval);
                }
            }, 200);
        }
    };


    return {clients,provideRef,handleMute};
};
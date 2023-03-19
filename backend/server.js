const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const ACTIONS = require("./actions");
const port = process.env.PORT || 4000;
const server = require('http').createServer(app);
const io = require("socket.io")(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET', 'POST'],
    }
})


//Config
dotenv.config({path:".env"});

// Connecting to database
connectDatabase();



// Sockets

const socketUserMapping = new Map();

io.on('connection',(socket)=>{
    // console.log('new connection', socket.id);

    socket.on(ACTIONS.JOIN,({roomId,user})=>{
        socketUserMapping.set(socket.id, user);

        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

        clients.forEach(clientId =>{
            io.to(clientId).emit(ACTIONS.ADD_PEER,{
                peerId: socket.id,
                createOffer:false,
                user
            });
            socket.emit(ACTIONS.ADD_PEER,{
                peerId: clientId,
                createOffer:true,
                user:socketUserMapping.get(clientId)
            });
        });

        socket.join(roomId)

    });

    // Handle relay Ice
    socket.on(ACTIONS.RELAY_ICE,({peerId, icecandidate})=>{
        io.to(peerId).emit(ACTIONS.ICE_CANDIDATE,{
            peerId: socket.id,
            icecandidate,
        })
    });

    //Handle relay sdp(session description)
    socket.on(ACTIONS.RELAY_SDP,({peerId, sessionDescription})=>{
        io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION,({
            peerId:socket.id,
            sessionDescription
        }))
    });


    // Handle mute/unmute
    socket.on(ACTIONS.MUTE,({roomId,userId})=>{
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach(clientId => {
            io.to(clientId).emit(ACTIONS.MUTE,{
                peerId:socket.id,
                userId,
            })
        })
    });

    socket.on(ACTIONS.UNMUTE,({roomId,userId})=>{
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

        clients.forEach(clientId => {
            io.to(clientId).emit(ACTIONS.UNMUTE,{
                peerId:socket.id,
                userId,
            })
        })
    });

    socket.on(ACTIONS.MUTE_INFO, ({ userId, roomId, isMute }) => {
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach((clientId) => {
            if (clientId !== socket.id) {
                io.to(clientId).emit(ACTIONS.MUTE_INFO, {
                    userId,
                    isMute,
                });
            }
        });
    });

    socket.on(ACTIONS.QUIZ_STATE, ({roomId, quizState, userId})=>{
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach(clientId => {
            io.to(clientId).emit(ACTIONS.QUIZ_STATE,{
                quizState,
                userId,
            })
        })
    })


    // Leaving the room
    const leaveRoom = ({roomId}) => {
        const {rooms} = socket;

        Array.from(rooms).forEach(roomId => {
            const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
            clients.forEach(clientId => {
                io.to(clientId).emit(ACTIONS.REMOVE_PEER,{
                    peerId:socket.id,
                    userId: socketUserMapping.get(socket.id)?._id
                });
                socket.emit(ACTIONS.REMOVE_PEER,{
                    peerId: clientId,
                    userId: socketUserMapping.get(clientId)?._id
                });
            });

            socket.leave(roomId);
        });

        socketUserMapping.delete(socket.id);

    }
    socket.on(ACTIONS.LEAVE, leaveRoom);
    socket.on('disconnecting',leaveRoom)
});











server.listen(port, ()=> console.log(`Server is running on http://localhost:${port}`) )


// Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to Uncaught Exception`);
    process.exit(1);
})
// Unhandled Promise Rejections
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    })
});
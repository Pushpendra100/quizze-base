import React,{ Fragment,useState, useEffect } from 'react'
import QuizTest from '../components/QuizTest';
import MetaData from '../containers/MetaData';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import MicOffIcon from '@mui/icons-material/MicOff';
import test from "../assets/test.jpg";
import HeadphonesIcon from '@mui/icons-material/Headphones';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate,useParams} from "react-router-dom";
import { getUser } from '../store/actions/userActions';
import { useWebRTC } from '../hooks/useWebRTC';
import { getTeam } from '../store/actions/teamActions';





const QuizTeam = () => {

  const dispatch = useDispatch();
  const {teamId:roomId} = useParams();
  const {user} = useSelector(state => state.user);
  const {clients, provideRef, handleMute} = useWebRTC(roomId, user);
  const [isMute, setMute] = useState(true);

  const {team} = useSelector(state=>state.team)

  useEffect(() => {
    dispatch(getTeam(roomId))
  }, [])

  useEffect(() => {
    handleMute(isMute, user._id);
  }, [isMute]);

  const handleMuteClick = (clientId) =>{
    if(clientId !== user._id) return;
    setMute(isMute=>!isMute);
  };


  return (
    <Fragment>
      <MetaData title="Quizze | Home" />
        <div className="quizTeamPage">
          <div className="quizTeamPageBar">
            <div className="quizTeamPageBarSec1">
              <h4>{team && team.name}</h4>
              <p>{clients.length ==1?`${clients.length} member`:`${clients.length} members`} joined</p>
            </div>
            <div className="quizTeamPageBarLine"></div>
            <div className="quizTeamPageBarSec2">
              {
                user && clients && clients.map((client,i)=>{
                  if(client._id !== user._id){
                    return (
                      <div className="quizTeamBarMem" key={i}> 
                        <div className="quizTeamBarMemImg">
                          <img src={`data:image/svg+xml;base64, ${client.avatar}`} alt="avatar" />
                        </div>
                        <p>{client.username} </p>
                        <audio ref={(instance)=> provideRef(instance, client._id)} autoPlay></audio>
                        <button onClick={()=>handleMuteClick(client._id)} className='quizTeamBarMemVoiceIcon'>
                          {
                            client.muted?(<MicOffIcon />):(<KeyboardVoiceIcon />)
                          }
                        </button>
                      </div>
                    )
                  }
              })
              }
            </div>
            <div className="quizTeamPageBarLine"></div>
            <div className="quizTeamPageBarSec3">
              {
                  clients.map((client,i)=>{
                    if(client._id === user._id){
                      return (
                        <div className="quizTeamBarMem" key={i}> 
                          <div className="quizTeamBarMemImg">
                            <img src={`data:image/svg+xml;base64, ${client.avatar}`} alt="avatar" />
                          </div>
                          <p>{client.username}</p>
                          <audio ref={(instance)=> provideRef(instance, client._id)} autoPlay></audio>
                          <button onClick={()=>handleMuteClick(client._id)} className='quizTeamBarMemVoiceIcon'>
                            {
                              client.muted?(<MicOffIcon />):(<KeyboardVoiceIcon />)
                            }
                          </button>
                        </div>
                      )
                    }
                })
                }
            </div>
          </div>
          <div className="quizTeamPageSection">
            <QuizTest/>
          </div>
        </div>
    </Fragment>
  )
}

export default QuizTeam

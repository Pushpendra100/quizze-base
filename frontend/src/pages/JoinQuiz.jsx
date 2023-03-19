import React,{Fragment,useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import MetaData from "../containers/MetaData";
import { clearErrors } from '../store/actions/userActions';
import { getAllTeams } from '../store/actions/teamActions';
import {useAlert} from "react-alert";



const JoinQuiz = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const alert = useAlert();
    const [teamName, setTeamName] = useState("")

    const {error,loading,  isAuthenticated, user} = useSelector(state => state.user);
    const {teams} = useSelector(state => state.teams);

    useEffect(() => {
        dispatch(getAllTeams());
    }, [])
    

    useEffect(()=>{
        if(!loading && !user){
            navigate('/')
        }
    },[user])           
    
    useEffect(() => {
    if(error){
        alert.error(error);
        dispatch(clearErrors());
    }
    }, [dispatch, error, alert])

    const handleTeamJoin = () =>{
        let team;
        if(teamName.length !== 0){
            for(let i = 0; i<teams.length; i++){
                if(teams[i].name === teamName.trim()){
                    team = teams[i];
                    break;
                }
            };
            if(team){
                let userPartOfTeam = false;
                for(let i = 0; i<team.members.length; i++){
                    if(team.members[i].username === user.username){
                        userPartOfTeam = true;
                        break;
                    }
                }
                if(userPartOfTeam){
                    navigate(`/quiz-attempt/${params.id}/team/${team._id}`);
                }else{
                    alert.error("You are not member of the team")
                }
            }else{
                alert.error("team does't exist")
            }

        }else{
            alert.error("Please enter Team's name");
        }
    }

    const handleIndividualJoin = () =>{
        navigate(`/quiz-attempt/${params.id}`);
    }


    
  return (
    <Fragment>
        {
            !teams? (<div>Loading</div>):(
                <Fragment>
                <MetaData title="Quizze | Join Quiz" />
                <div className="joinQuizPage">
                    <div className="joinQuizBox">
                        <div className="closeBtn">
                            <Link to='/' className='closeBtnLink'><CloseIcon fontSize='large'/></Link>
                        </div>
                        <div className="joinQuizHeading">
                            <h1>Join Quiz</h1>
                        </div>
                        <div className="joinQuizSection">
                            <div className="jqSec1">
                                <div className="jq-sec1-joinTeam">
                                    <h1>Join as a Team</h1>
                                    <label htmlFor="teamName">Team Name</label>
                                    <input type="text" id='teamName' name='teamName' placeholder="Enter Team's Name" value={teamName} onChange={(e)=>setTeamName(e.target.value)}/>
                                    <button className="teamJoinBtn" onClick={handleTeamJoin}>Join</button>
                                </div>
                            </div>
                            <div className="jqSec2">
                                <div className="jq-sec2-joinUser">
                                    <h1>Join Individually</h1>
                                    <button className="userJoinBtn" onClick={handleIndividualJoin}>Join</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </Fragment>
            )
        }
    </Fragment>

  )
}

export default JoinQuiz;
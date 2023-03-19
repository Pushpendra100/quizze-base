import React,{Fragment,useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import GoogleIcon from '@mui/icons-material/Google';
import CloseIcon from '@mui/icons-material/Close';
import MetaData from "../containers/MetaData";
import AddIcon from '@mui/icons-material/Add';
import { clearErrors, getUsersUsername } from '../store/actions/userActions';
import { createTeam, getTeamsName } from '../store/actions/teamActions';
import {useAlert} from "react-alert";
import {Buffer} from "buffer";
import axios from 'axios';



const CreateTeamPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const [teamName, setTeamName] = useState("");
    const [username, setUsername] = useState("");
    const [members, setMembers] = useState([]);
    const api = "https://api.dicebear.com/5.x/initials/svg?seed=";
    const usersArr = [];
    const teamsArr = [];
    

    const {loading, error, user} = useSelector(state => state.user)
    const {users} = useSelector(state => state.users);
    const {loading:teamLoading,team} = useSelector(state => state.team);
    const {teams} = useSelector(state => state.teams);



    useEffect(() => {
        dispatch(getUsersUsername());
        dispatch(getTeamsName())
    }, [])

    useEffect(() => {
        if(teams){
            teams.forEach(team => {
                teamsArr.push(team.name)
            });
        }
    }, [teams,teamsArr]);

    useEffect(() => {
        if(users){
            users.forEach(user => {
                usersArr.push(user.username)
            });
        }
    }, [users,usersArr]);

    const handleAddTeamMem = (e) => {
        e.preventDefault();
        if(username.length !== 0){
            if(usersArr.includes(username)){
                if(username !== user.username){
                    if(members.length !== 0){
                        let isPresent = false;
                        members.forEach(member => {
                            if(member.username == username){
                                isPresent = true;
                            }
                        });
                        if(!isPresent){
                            setMembers([...members, {username,role:"member"}])
                        }else{
                            alert.error("username already included")
                        }
                    }else{
                        setMembers([{username,role:"member"}])
                        setUsername("")
                    }
                }else{
                    alert.error("You are already a member")
                }
            }else{
                alert.error("User doesn't exist")
            }
        }else{
            alert.error("Please enter the username")
        }
    }

    const handleCreateTeam = async(e) => {
        e.preventDefault();

        if(teamName.length >= 4){
            if(!teamsArr.includes(teamName)){
                const image = await axios.get(`${api}${teamName}`)
                const buffer = new Buffer(image.data);
                const data = buffer.toString("base64");
        
                const team = {
                    name:teamName,
                    members:[...members,{username:user.username,role:"admin"}],
                    image:data
                }
                dispatch(createTeam({team,userId:user._id}));
            }else{
                alert.error("Team Name already taken")
            }
        }else{
            alert.error("Team Name must have atleast 4 characters");
        }
    }

    const handleAdmin = (e,i) => {
        e.preventDefault();
        if(members[i].role==="member"){
            let newArr = [...members];
            newArr[i].role = "admin";
            setMembers(newArr)
        }else{
            let newArr = [...members];
            newArr[i].role = "member";
            setMembers(newArr);
        }
    }
    const handleMemDelete = (e,i) => {
        e.preventDefault();
        let newArr = [...members];
        newArr.splice(i,1);
        setMembers(newArr);
    }

    
    useEffect(() => {
        if(!teamLoading && team){
            if(typeof team === "string"){
                navigate(`/team/${team}`);
            }
        }
    }, [teamLoading,team])

    useEffect(()=>{
        if(!loading){
            if(!user){
                navigate('/')
            }
        }
    },[loading]);

    useEffect(() => {
        if(error){
          alert.error(error);
          dispatch(clearErrors());
        }
      }, [dispatch, error, alert])
    
  return (
    <Fragment>
    <MetaData title="Quizze | Login" />
    <div className="createTeamPage">
        <div className="createTeamBox">
            <div className="closeBtn">
                <Link to='/' className='closeBtnLink'><CloseIcon fontSize='large'/></Link>
            </div>
            <div className="createTeamHeading">
                <h1>Create Team</h1>
            </div>
            <div className="createTeamSection">

                    <form className='createTeamForm' >
                        <label htmlFor="name" className='createTeamLabel'>Team Name</label>
                        <input type="text" id='name' name='name' placeholder='Team Name' value={teamName} onChange={(e)=>setTeamName(e.target.value)} />
                        <label  className='createTeamLabel'>Members</label>
                        <div className="addTeamMemBox">
                            <button onClick={(e)=>handleAddTeamMem(e)} disable={(!users).toString()} ><AddIcon/></button>
                            <input type="text" id='username' name='username' placeholder='Enter username' value={username} onChange={(e)=>setUsername(e.target.value)} />
                        </div>
                        <div className="teamMemBox">
                        {
                            members && members.map((member,i) => (
                                <div className="teamMemBoxCard" key={i}>
                                    <p>{member.username}</p>
                                    <button onClick={(e)=>handleAdmin(e,i)} className={member.role=="admin"?"tmbc-btn-active":""} >Admin</button>
                                    <CloseIcon className='teamMemBoxCardCloseIcon' onClick={(e)=>handleMemDelete(e,i)}/>
                                </div>
                            ))
                        }
                        </div>
                        <button className='createTeamBtnSubmit' onClick={(e)=>handleCreateTeam(e)}>Create Team</button>
                    </form>
            </div>
        </div>
    </div>
</Fragment>
  )
}

export default CreateTeamPage;
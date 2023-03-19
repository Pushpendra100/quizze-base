import React,{Fragment,useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import GoogleIcon from '@mui/icons-material/Google';
import CloseIcon from '@mui/icons-material/Close';
import MetaData from "../containers/MetaData";
import { clearErrors, getUsersUsername, register, getUser } from '../store/actions/userActions';
import {useAlert} from "react-alert";
import {Buffer} from "buffer";
import axios from 'axios';



const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const {error,loading,  isAuthenticated, user: userr} = useSelector(state => state.user);

    // useEffect(() => {
    //     dispatch(getUser());
    //   }, [])
    
      useEffect(()=>{
        if(isAuthenticated){
          navigate(`/${userr.username}/profile`);
        }
      },[userr])
    
      useEffect(() => {
        if(error){
          alert.error(error);
          dispatch(clearErrors());
        }
      }, [dispatch, error, alert])




    const usersArr = [];
    const {users} = useSelector(state => state.users);
    const api = "https://api.multiavatar.com/17489127";
    const [avatar, setAvatar] = useState();
    const [isDone, setIsDone] = useState(false);
    const [user, setuser] = useState({
        name:"",
        username:"",
        email:"",
        password:"",
    });


    useEffect(() => {
        dispatch(getUsersUsername())
        const getAvatars = async()=>{
            const image = await axios.get(`${api}/${Math.round(Math.random()*1000)}`)
            const buffer = new Buffer(image.data);
            const data = buffer.toString("base64");
            setAvatar(data);
            setIsDone(true);
        }
        getAvatars();
    }, [])


    useEffect(() => {
        if(users){
            users.forEach(user => {
                usersArr.push(user.username)
            });
        }
    }, [users,usersArr]);


    
    const handleDataChange = (e) =>{
        if(e.target.name === "name"){
            setuser({...user,name:e.target.value})
        }else if(e.target.name === "username"){
            setuser({...user,username:e.target.value})
        }else if(e.target.name === "email"){
            setuser({...user,email:e.target.value})
        }else{
            setuser({...user,password:e.target.value})
        }
    };


    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleRegister = () =>{
        if(user.name.length >= 4){
            if(user.username.length >= 4){
                if(!usersArr.includes(user.username)){
                    if(user.username.toLowerCase() !== user.name.toLowerCase()){
                        if(user.email.length !== 0){
                            if (isValidEmail(user.email)) {
                                if(user.password.length >=8){
                                        dispatch(register({user,avatar}))
                                }else{
                                    alert.error('password must have 8 charcaters');
                                }
                            }else{
                                alert.error('Email is invalid');
                            }
                        }else{
                            alert.error("please enter email")
                        }
                    }else{
                        alert.error("name and username can't be same")
                    }
                }else{
                    alert.error("Username already taken")
                }
            }else{
                alert.error("username must have atleast 4 characters")
            }
        }else{
            alert.error("name must have atleast 4 characters")
        }
    };


    
  return (
    <Fragment>
    <MetaData title="Quizze | Login" />
    <div className="registerPage">
        <div className="registerBox">
            <div className="closeBtn">
                <Link to='/' className='closeBtnLink'><CloseIcon fontSize='large'/></Link>
            </div>
            <div className="registerHeading">
                <h1>Sign Up</h1>
                <span>Play and create quizzes</span>
            </div>
            <div className="regSection">
                <div className="regSec1">
                    <form className='registerForm' >
                        <label htmlFor="name">Full Name<span>*</span></label>
                        <input type="text" id='name' name='name' placeholder='Full Name' value={user.name} onChange={handleDataChange} />
                        <label htmlFor="username">Username<span>*</span></label>
                        <input type="text" id='username' name='username' placeholder='Username' value={user.username} onChange={handleDataChange} />
                        <label htmlFor="email">Email<span>*</span></label>
                        <input type="email" id='email' name='email' placeholder='abc@gmail.com' value={user.email}  onChange={handleDataChange}/>
                        <label htmlFor="password">Password<span>*</span></label>
                        <input type="password" id='password' name='password' placeholder='Min. 8 characters' value={user.password} onChange={handleDataChange}/>
                    </form>
                </div>
                <div className="regSec2">
                    <button className="btnGoogleRegister">
                        <GoogleIcon /> <span>Sign up with Google</span>
                    </button>
                    <div className='registerLine'></div>
                    <button className="btnRegister" onClick={handleRegister} disabled={!isDone}>
                        Register
                    </button>
                    <div className="registerLogin">
                        Already have an account ? <Link className='registerLoginLink' to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</Fragment>
  )
}

export default Register
import React,{Fragment, useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import CloseIcon from '@mui/icons-material/Close';
import MetaData from "../containers/MetaData";
import { login, clearErrors , getUser} from '../store/actions/userActions';
import {useAlert} from "react-alert";
import {GoogleLogin} from "react-google-login"
const client_id = "136972860469-3mhe264sa6vr1gbr972i8074q4pbgbo4.apps.googleusercontent.com";


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const {error, loading, isAuthenticated, user : userr} = useSelector(state => state.user);


  const [user, setUser] = useState({
    email:"",
    password:"",
  });

  const registerDataChange = (e) =>{
    if(e.target.name === "email"){
      setUser({...user,email:e.target.value})
    }else{
      setUser({...user,password:e.target.value})
    }
  }
  const handleLogin = (e) =>{
    e.preventDefault(); 
    if(user.email.length !== 0 && user.password.length !== 0){
      dispatch(login(user))
    }else{
      alert.error("please complete the fields")
    }   
  };

  useEffect(() => {
    dispatch(getUser());
  }, [])

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


const onSuccess = (res) =>{
  console.log("Login success! Current User: ", res.profileObj);
}

const onFailure = (res) => {
  console.log("Login Failed ", res);
}

  return (
    <Fragment>
        <MetaData title="Quizze | Login" />
        <div className="loginPage">
            <div className="loginBox">
              <div className="closeBtn">
                  <Link to='/' className='closeBtnLink'><CloseIcon fontSize='large'/></Link>
              </div>
              <div className="loginHeading">
                <h1>Sign In</h1>
                <span>Play and create quizzes</span>
              </div>
              <div className="signinGoogle">
                <button className="btnGoogle">
                  <GoogleIcon /> <span>Sign in with Google</span>
                  <GoogleLogin
                    clientId={client_id}
                    buttonText="Login"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                  />
                </button>
              </div>
              <div className='loginLine'></div>
              <form className='loginForm' onSubmit={handleLogin} >
                <label htmlFor="email">Email<span>*</span></label>
                <input type="email" id='email' placeholder='mail@website.com' name='email' value={user.email} onChange={registerDataChange}/>
                <label htmlFor="password">Password<span>*</span></label>
                <input type="password" id='password' placeholder='Min. 8 characters' name='password' value={user.password} onChange={registerDataChange}/>
                <input type="submit" value="login" />
              </form>
              <div className="forgotPassword">
                <Link to="/forgotpassword" className="forgotPasswordLink">forgot password</Link>
              </div>
              <div className="loginRegister">
                Don't have an account ? <Link className='loginRegisterLink' to="/register">Register</Link>
              </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Login
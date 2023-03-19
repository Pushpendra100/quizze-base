import React, { Fragment ,useEffect} from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import { clearErrors, getUser } from '../store/actions/userActions';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

import MetaData from "../containers/MetaData";
import Logoblack from "../assets/logo-black.png";
import question from "../assets/question.png";

const Home = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert()


  const {isAuthenticated, error, user} = useSelector(state => state.user)

  
  useEffect(()=>{
      if(isAuthenticated){
        navigate(`/${user.username}/profile`)
    }
  },[isAuthenticated])

  useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
    }, [dispatch, error, alert])

  return (
    <Fragment>
      <MetaData title="Quizze | Home" />
      <div className='homeNavbar'>
        <div className="navOptionsContainer">
          <ul className="navList">
            <li><Link className='navLink' to='/qtracks'>QTracks</Link></li>
            <li><Link className='navLink' to='/livequiz'>Quiz</Link></li>
          </ul>
        </div>
        <div className="navLogo">
          <img src={Logoblack} alt="logo" />
        </div> 
        <div className="navOptionsContainer">
          <ul className="navList navListLast">
            <li><Link className='navLink' to='/login'>Sign In</Link></li>
            <li><Link className='navLink' to='/register'>Register</Link></li>
          </ul>
        </div>
      </div>
      <div className="introContainer">
        <div className="introbox">
          <div className="introSec1">
            <h1>The planet of quizzing!</h1>
            <p>Whether you are brand new to quiz, a regular pub-quizzer or are part of the quizzing elite – there is something here for everyone, wherever you are on the planet. Welcome!</p>
          </div>
          <div className="introSec2">
            <img src={question} alt="" />
          </div>
        </div>
      </div>
      <div className="homeFooter">
        <div className="footerSec1">
          <div className="fs1part1">
            <img src={Logoblack} alt="logo" />
            <div className="footer-icons">
              <a href="#" rel="noreferrer"><InstagramIcon fontSize='large' /></a>
              <a href="#" rel="noreferrer"><TwitterIcon fontSize='large'/></a>
              <a href="#" rel="noreferrer"><FacebookIcon fontSize='large'/></a>
            </div>
          </div>
          <div className="fs1part2">
            <form>
              <h4>Any queries?</h4>
              <input type="text" placeholder='Email' name='email' />
              <textarea name="comment" placeholder='Comment' id="" cols="30" rows="6"></textarea>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
        <div className="footerSec2">
          <p>Copyright &copy; 2023</p>
        </div>
      </div>
    </Fragment>
  )
}

export default Home;
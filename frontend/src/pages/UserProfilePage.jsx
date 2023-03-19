import React, { Fragment,useEffect } from 'react';
import Navbar from '../components/Navbar';
import MetaData from '../containers/MetaData';
import Sidebar from '../components/Sidebar';
import UserProfile from '../components/UserProfile';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {removeHalfQuizes, clearErrors} from "../store/actions/userActions"
import {useAlert} from "react-alert";

const UserProfilePage = () => {

const params = useParams();

const alert = useAlert()
const dispatch = useDispatch();
const navigate = useNavigate();

const {loading, isAuthenticated, error, user} = useSelector(state => state.user)

useEffect(() => {
  if(!loading){
      user && user._id && dispatch(removeHalfQuizes(user._id))
  }
}, [loading, user])

useEffect(()=>{
    if(!loading){
        if(!isAuthenticated){
            navigate('/')
        }
    }
},[loading])

useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
}, [dispatch, error, alert])

  return (
    <Fragment>
      <MetaData title="Quizze | Home" />
        <div className="page">
            <Navbar/>
            <div className="pageContainer">
                <div className="pageContainerBar">
                    <Sidebar userPageContent="home"/>
                </div>
                <div className="pageContainerSection">
                    {
                      user && <UserProfile username={user.username} name={user.name} avatar={user.avatar} userId={user._id}/>
                    }
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default UserProfilePage;
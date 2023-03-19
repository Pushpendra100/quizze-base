import React, { Fragment, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MetaData from '../containers/MetaData';
import Sidebar from '../components/Sidebar';
import UserNotifications from '../components/UserNotifications';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUser, clearErrors} from "../store/actions/userActions"
import {useAlert} from "react-alert";

const UserNotificationsPage = () => {

const params = useParams();

const alert = useAlert()
const dispatch = useDispatch();
const navigate = useNavigate();

const {loading, isAuthenticated, error, user} = useSelector(state => state.user)

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
                  <Sidebar userPageContent="notifications"/>
                </div>
                <div className="pageContainerSection">
                  {
                      user && <UserNotifications/>
                  }
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default UserNotificationsPage;
import React,{useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

const Sidebar = ({userPageContent}) => {

  const navigate = useNavigate()

  const [homeActive,setHomeActive] = useState()
  const [teamsActive,setTeamsActive] = useState()
  const [notificationsActive,setNtificationsActive] = useState()

  const {user} = useSelector(state => state.user)


useEffect(() => {
  if(userPageContent === "home"){
    setHomeActive(true);
    setTeamsActive(false)
    setNtificationsActive(false)
  }else if(userPageContent === "teams"){
    setHomeActive(false);
    setTeamsActive(true)
    setNtificationsActive(false)
  }else if(userPageContent === "notifications"){
    setHomeActive(false);
    setTeamsActive(false)
    setNtificationsActive(true)
  }else{
    setHomeActive(false);
    setTeamsActive(false)
    setNtificationsActive(false)
  }
}, [userPageContent])


  return (
    <div className='sideBar'>
        <div className="sideIcons">
              <div className={`sideIconsLinkDiv ${homeActive? "sideIconsLinkActive":""} `} onClick={()=>navigate(`/${user.username}/profile`)}>
                <HomeOutlinedIcon fontSize='large'/> <span>Home</span>
              </div>
              <div className={`sideIconsLinkDiv ${teamsActive? "sideIconsLinkActive":""} `} onClick={()=>navigate(`/${user.username}/teams`)}>
                <GroupsOutlinedIcon fontSize='large'/> <span>Teams</span>
              </div>
              <div className={`sideIconsLinkDiv ${notificationsActive? "sideIconsLinkActive":""} `} onClick={()=>navigate(`/${user.username}/notifications`)}>
                <NotificationsNoneOutlinedIcon fontSize='large'/> <span>Notifications</span>
              </div>
        </div>
    </div>
  )
}
;
export default Sidebar
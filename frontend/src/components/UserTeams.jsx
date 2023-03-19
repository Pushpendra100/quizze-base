import React,{useEffect} from 'react';
import {Link, useNavigate , useParams} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import test from "../assets/test.jpg";
import {getUserTeams} from "../store/actions/teamActions"


const UserTeams = ({userId}) => {

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {teams} = useSelector(state=> state.teams);

  useEffect(() => {
    dispatch(getUserTeams(userId));
  }, [])

  const handleCreateTeam = () =>{
    navigate(`/${params.username}/create-team`);
  }

  return (
    <div className='userTeamContainer'>
      <div className="userTeamsSec1">
        <h1>Teams</h1>
        <button className="createTeamBtn" onClick={handleCreateTeam}>Create new Team</button>
      </div>
      <div className="userTeamsSec2">
      {
        teams && teams.map((team,i)=>(
          <Link to={`/team/${team.team}`} className='userTeamCard' key={i}>
            <div className="teamContCard">
              <div className="teamContCardImgContainer">
                <img src={`data:image/svg+xml;base64, ${team.image}`} alt="quiz image" />
              </div>
              <h5>{team.name}</h5>
            </div>
          </Link>
        ))
      }

      </div>
    </div>
  )
}

export default UserTeams;
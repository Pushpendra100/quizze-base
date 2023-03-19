import React,{Fragment, useEffect, useMemo, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import test from "../assets/test.jpg";
import {getTeam} from "../store/actions/teamActions";

import Table from './Table';


const Team = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const {loading,team} = useSelector(state => state.team);
    const [dataSection, setDataSection] = useState("given");
    const [showGivenQuizzes, setShowGivenQuizzes] = useState([]);

    // const {quizGiven, members} = useSelector(state => state.team.team)

      useEffect(() => {
          dispatch(getTeam(params.teamId))
      }, [])


    useEffect(() => {
        if(team && team.quizGiven && team.quizGiven.length !== 0){
            const arr1 = team.quizGiven.map(quiz => {
                // const ourUser = quiz.givenUsers.filter(user => user.user === userId)
                return ({
                    "name":quiz.name,
                    "topic":quiz.field,
                    // "score":ourUser[0].score,
                    "score":"1",
                    "rank":"1",
                    "status":"Live",
                    "ending-on":quiz.finalTime
                })
            })
            setShowGivenQuizzes(arr1)
        }
    }, [team])

    const givenQuizData = useMemo(()=>(
        [...showGivenQuizzes]
    ),[showGivenQuizzes]);

    const givenQuizColumns = useMemo(()=>([
      {
          Header:"Name",
          accessor:"name"
      },
      {
          Header:"Topic",
          accessor:"topic"
      },
      {
          Header:"Score",
          accessor:"score"
      },
      {
          Header:"Rank",
          accessor:"rank"
      },
      {
          Header:"Status",
          accessor:"status"
      },
      {
          Header:"Ending on",
          accessor:"ending-on"
      },
  ]),[])
   


  return (
    <Fragment>
      {
        typeof team === "object" && team && (
          <div className='team'>
              <div className="teamIntro">
                <div className="teamIntroSec1">
                  <div className="teamIntroImgContainer">
                    <img src={`data:image/svg+xml;base64, ${team.image}`} alt="team image" />
                  </div>
                </div>
                <div className="teamIntroSec2">
                  <h1>{team.name}</h1>
                  <h6>{team.members? team.members.length:"0"} Members</h6>
                </div>
              </div>
              <div className='pageSecLine'></div>
              <div className="teamDetails">
                <div className="teamDetailsOptions">
                  <button className={`userSecOptionsBtn ${dataSection==="given"?"optionsBtnActive":""}`} onClick={(e)=>setDataSection("given")}>Given</button>
                  <button className={`userSecOptionsBtn ${dataSection==="members"?"optionsBtnActive":""}`} onClick={(e)=>setDataSection("members")} >Members</button>
                </div>
                <div className="teamInfo">
                  {dataSection === "given" && <Table columns={givenQuizColumns} data={givenQuizData} quizzes={team.quizGiven} classHover="mainTableDataRowsHoverClass" />}
                  {dataSection === "members" && (
                    <div className='teamMembersBox'>
                    {
                      team.members && team.members.map((member,i) => (
                        <div className="teamPageMemCard" key={i}>
                          <div className="teamPageMemImg">
                          <img src={`data:image/svg+xml;base64, ${member.avatar}`} alt="user" />
                          </div>
                          <p>{member.username} {member.role === "admin"?"(Admin)":""}</p>
                        </div>
                      ))
                    }
                    </div>
                  )}
                </div>
              </div>
          </div>
        )
      }
    </Fragment>
  )
}

export default Team;
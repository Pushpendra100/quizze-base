import React,{useState,useEffect, useMemo, Fragment} from 'react';
import test from "../assets/test.jpg";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Table from './Table';
import {useDispatch, useSelector} from "react-redux";
import {getQuizDetails} from "../store/actions/quizActions";
import { useNavigate } from 'react-router-dom';



const Quiz = ({quizId}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {quiz} = useSelector(state => state.quiz)

    useEffect(() => {
        dispatch(getQuizDetails(quizId))
    }, [])



    const quizData = useMemo(()=>{
        if(quiz){
            return (
                [
                    {
                        "name": quiz.name,
                        "topic": quiz.field,
                        "participants":quiz.totalParticipants,
                        "created-on":quiz.createdTime,
                        "created-by":quiz.user,
                        "ending-on":quiz.finalTime,
                        "time-limit":quiz.timeLimit,
                    }
                ]
            )
        }
    },[quiz]);

    const dataLeaderBoard = useMemo(()=>(
        [
            {
                "rank":1,
                "name":"eikua",
                "score":"70"
            },
            {
                "rank":2,
                "name":"wow",
                "score":"60"
            },
            {
                "rank":3,
                "name":"safjl",
                "score":"55"
            },
            {
                "rank":4,
                "name":"thiss",
                "score":"40"
            },
            {
                "rank":5,
                "name":"eiow",
                "score":"40"
            },
        ]
    ),[]);

    const quizColumns = useMemo(()=>([
        {
            Header:"Created on",
            accessor:"created-on"
        },
        {
            Header:"Ending on",
            accessor:"ending-on"
        },
        {
            Header:"Participants",
            accessor:"participants"
        },
        {
            Header:"Created by",
            accessor:"created-by"
        },
        {
            Header:"Time Limit",
            accessor:"time-limit"
        },
    ]),[]);

    const columnsLeaderBoard = useMemo(()=>([
        {
            Header:"Rank",
            accessor:"rank"
        },
        {
            Header:"Name",
            accessor:"name"
        },
        {
            Header:"Score",
            accessor:"score"
        }
    ]),[])
    

  return (
    <Fragment>
        {
            quiz && (

                <div className='quiz'>
                    <div className="quizIntro">
                        <div className="quizIntroSec1">
                            <div className="quizIntroImgContainer">
                                <img src={`data:image/svg+xml;base64, ${quiz.image}`} alt="quiz image" />
                            </div>
                        </div>
                        <div className="quizIntroSec2">
                                <h1>{quiz.name}</h1>
                                <h4>{quiz.field}</h4>
                                <h6>{quiz.totalPoints} Points</h6>
                                <h5>{"Live"}</h5>
                        </div>
                        <div className="quizIntroSec3">
                            <div className='quizIntroSec3Box'>
                                <div>
                                    <ThumbUpOffAltIcon className='quizIntroSec3Icon' fontSize='large' /> <span>2</span>
                                </div>
                                <div>
                                    <ThumbDownOffAltIcon className='quizIntroSec3Icon' fontSize='large'/><span>2</span>
                                </div>
                                <div>
                                    <StarBorderIcon className='quizIntroSec3Icon' fontSize='large' />
                                </div>
                            </div>
                            <button className="startQuizBtn" onClick={()=> navigate(`/join-quiz/${quizId}`)}>Start</button>
                        </div>
                    </div>
                    <div className="quizDetails">
                            <Table columns={quizColumns} data={quizData} classHover="" />
                        <div className="quizDescription"> <span>Description :  </span>
                            {quiz.about}
                        </div>
                    </div>
                    <div className="quizExtras">
                        <div className="quizExtrasOptions">
                            <button className="quizExtrasOptionsBtn quizExtrasOptionsBtnActive">Leaderboard</button>
                            <button className="quizExtrasOptionsBtn">Comments</button>
                        </div>
                        <div className="quizExtraSection">
                            {/* <Table columns={columnsLeaderBoard} data={dataLeaderBoard} classHover="mainTableDataRowsHoverClass" /> */}
                            {/* <div className="quizCommentContainer">
                                <div className="quizComment">
                                    <div className="quizCommentSec1">
                                        <div className="quizCommentSec1ImgContainer">
                                            <img src={test} alt="" />
                                        </div>
                                    </div>
                                    <div className="quizCommentSec2">
                                        <div className="quizCommentHeading">
                                            <h5>Ram <span>2 years ago</span></h5>
                                        </div>
                                        <div className="quizCommentPara">
                                            <p>This is an insane edit! Exactly what I would visualise from this song! More like this please</p>
                                        </div>
                                        <div className="quizCommentLandD">
                                            <div className='quizCommentLandDBox'>
                                                <ThumbUpOffAltIcon className='quizCommentLandDIcon'/> <span>2</span>
                                            </div>
                                            <div className='quizCommentLandDBox'> 
                                                <ThumbDownOffAltIcon className='quizCommentLandDIcon'/><span>2</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="quizComment">
                                    <div className="quizCommentSec1">
                                        <div className="quizCommentSec1ImgContainer">
                                            <img src={test} alt="" />
                                        </div>
                                    </div>
                                    <div className="quizCommentSec2">
                                        <div className="quizCommentHeading">
                                            <h5>Ram <span>2 years ago</span></h5>
                                        </div>
                                        <div className="quizCommentPara">
                                            <p>This is an insane edit! Exactly what I would visualise from this song! More like this please</p>
                                        </div>
                                        <div className="quizCommentLandD">
                                            <div className='quizCommentLandDBox'>
                                                <ThumbUpOffAltIcon className='quizCommentLandDIcon'/> <span>2</span>
                                            </div>
                                            <div className='quizCommentLandDBox'> 
                                                <ThumbDownOffAltIcon className='quizCommentLandDIcon'/><span>2</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="quizComment">
                                    <div className="quizCommentSec1">
                                        <div className="quizCommentSec1ImgContainer">
                                            <img src={test} alt="" />
                                        </div>
                                    </div>
                                    <div className="quizCommentSec2">
                                        <div className="quizCommentHeading">
                                            <h5>Ram <span>2 years ago</span></h5>
                                        </div>
                                        <div className="quizCommentPara">
                                            <p>This is an insane edit! Exactly what I would visualise from this song! More like this please</p>
                                        </div>
                                        <div className="quizCommentLandD">
                                            <div className='quizCommentLandDBox'>
                                                <ThumbUpOffAltIcon className='quizCommentLandDIcon'/> <span>2</span>
                                            </div>
                                            <div className='quizCommentLandDBox'> 
                                                <ThumbDownOffAltIcon className='quizCommentLandDIcon'/><span>2</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="quizComment">
                                    <div className="quizCommentSec1">
                                        <div className="quizCommentSec1ImgContainer">
                                            <img src={test} alt="" />
                                        </div>
                                    </div>
                                    <div className="quizCommentSec2">
                                        <div className="quizCommentHeading">
                                            <h5>Ram <span>2 years ago</span></h5>
                                        </div>
                                        <div className="quizCommentPara">
                                            <p>This is an insane edit! Exactly what I would visualise from this song! More like this please</p>
                                        </div>
                                        <div className="quizCommentLandD">
                                            <div className='quizCommentLandDBox'>
                                                <ThumbUpOffAltIcon className='quizCommentLandDIcon'/> <span>2</span>
                                            </div>
                                            <div className='quizCommentLandDBox'> 
                                                <ThumbDownOffAltIcon className='quizCommentLandDIcon'/><span>2</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="quizComment">
                                    <div className="quizCommentSec1">
                                        <div className="quizCommentSec1ImgContainer">
                                            <img src={test} alt="" />
                                        </div>
                                    </div>
                                    <div className="quizCommentSec2">
                                        <div className="quizCommentHeading">
                                            <h5>Ram <span>2 years ago</span></h5>
                                        </div>
                                        <div className="quizCommentPara">
                                            <p>This is an insane edit! Exactly what I would visualise from this song! More like this please</p>
                                        </div>
                                        <div className="quizCommentLandD">
                                            <div className='quizCommentLandDBox'>
                                                <ThumbUpOffAltIcon className='quizCommentLandDIcon'/> <span>2</span>
                                            </div>
                                            <div className='quizCommentLandDBox'> 
                                                <ThumbDownOffAltIcon className='quizCommentLandDIcon'/><span>2</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            )
        }
    </Fragment>
  )
}

export default Quiz;
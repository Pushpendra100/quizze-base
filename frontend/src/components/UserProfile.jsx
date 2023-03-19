import React,{useEffect,useState, useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from "react-router-dom";
import {getQuizzesInfo} from "../store/actions/quizActions"
import Table from './Table';


const UserProfile = ({username, name, avatar, userId}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dataSection, setDataSection] = useState("created");
    const [showCreatedQuizzes, setShowCreatedQuizzes] = useState([]);
    const [showGivenQuizzes, setShowGivenQuizzes] = useState([]);

    const {loading, createdQuizzes, givenQuizzes, starredQuizzes} = useSelector(state => state.quizzes)


    const handleCreateQuiz = () =>{
        navigate(`/${username}/create-quiz`)
    }

    useEffect(() => {
        dispatch(getQuizzesInfo(userId)); //it will return created,given and starred quizes of the user
    }, [])

    useEffect(() => {
        if(createdQuizzes && createdQuizzes.length !== 0){
            const arr = createdQuizzes.map(quiz => {
                return {
                    "name":quiz.name,
                    "topic":quiz.field,
                    "participants":quiz.totalParticipants,
                    "created-on":quiz.createdTime,
                    "status":"Live",
                    "ending-on":quiz.finalTime
                }
            })
            setShowCreatedQuizzes(arr)
        }
        if(givenQuizzes && givenQuizzes.length !== 0){
            const arr1 = givenQuizzes.map(quiz => {
                const ourUser = quiz.givenUsers.filter(user => user.user === userId)
                return ({
                    "name":quiz.name,
                    "topic":quiz.field,
                    "score":ourUser[0].score,
                    "rank":"1",
                    "status":"Live",
                    "ending-on":quiz.finalTime
                })
            })
            setShowGivenQuizzes(arr1)
        }
    }, [createdQuizzes])
    

    const createdQuizData = useMemo(()=>(
        [...showCreatedQuizzes]
    ),[showCreatedQuizzes]);

    const givenQuizData = useMemo(()=>(
        [...showGivenQuizzes]
    ),[showGivenQuizzes]);
        

    const createdQuizColumns = useMemo(()=>([
        {
            Header:"Name",
            accessor:"name"
        },
        {
            Header:"Topic",
            accessor:"topic"
        },
        {
            Header:"Paticipants",
            accessor:"participants"
        },
        {
            Header:"Created on",
            accessor:"created-on"
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
        <div className='userProfileContainer'>
            <div className="userIntro">
                <div className="userIntroSec1">
                    <div className="userIntroImgContainer">
                        <img src={`data:image/svg+xml;base64, ${avatar}`} alt="user" />
                    </div>
                </div>
                <div className="userIntroSec2">
                    <div>
                        <h1>{username}</h1>
                        <h4>{name}</h4>
                    </div>
                    <button className="createQuizBtn" onClick={handleCreateQuiz}>Create a Quiz</button>
                </div>
            </div>
            <div className='pageSecLine'></div>
            <div className="userSection">
                <div className="userSecOptions">
                    <button className={`userSecOptionsBtn ${dataSection==="created"?"optionsBtnActive":""}`} onClick={(e)=>setDataSection("created")}>Created</button>
                    <button className={`userSecOptionsBtn ${dataSection==="given"?"optionsBtnActive":""}`} onClick={(e)=>setDataSection("given")} >Given</button>
                    <button className={`userSecOptionsBtn ${dataSection==="starred"?"optionsBtnActive":""}`} onClick={(e)=>setDataSection("starred")} >Starred</button>
                    <button className={`userSecOptionsBtn ${dataSection==="stats"?"optionsBtnActive":""}`} onClick={(e)=>setDataSection("stats")} >Stats</button>
                </div>
                <div className="userQuizTable">
                        {dataSection === "created" && <Table columns={createdQuizColumns} data={createdQuizData} quizzes={createdQuizzes} classHover="mainTableDataRowsHoverClass" />}
                        {dataSection === "given" && <Table columns={givenQuizColumns} data={givenQuizData} quizzes={givenQuizzes} classHover="mainTableDataRowsHoverClass" />}
                </div>
            </div>
        </div>

  )
}

export default UserProfile;
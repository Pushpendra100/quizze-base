import React,{useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {quizAddAnsAndPoints} from "../store/actions/quizActions";


const CreateQuizPage2 = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalPoints, setTotalPoints] = useState(0);

    const {loading,quiz} = useSelector(state => state.createQuiz)
    const {isAuthenticated} = useSelector(state => state.user)


    const [questions, setQuestions] = useState([]);


    useEffect(() => {
        let newArr = [];
        if(quiz && Array.isArray(quiz.questions) && quiz.questions.length != 0){
            quiz.questions.forEach(question=>{
                let q = {
                    question:question.question,
                    type:question.type,
                    options:question.options,
                    correctAns:[],
                    points:""
                }
                newArr.push(q);
            }) 
            setQuestions(newArr)
        }
    }, [quiz])
    

    const handlePoints = (e,i) =>{
        let newArr = [...questions];
        newArr[i].points = e.target.value;
        setQuestions([...newArr]);

        let totalp = 0
        for(let i = 0; i<questions.length;i++){
            totalp += Number(questions[i].points)
        }
        setTotalPoints(totalp);
    }
    const handleOptionClick = (e,i, i1) =>{
        let newArr = [...questions];
        if(newArr[i].type === "mcq"){
            if(newArr[i].correctAns.includes(e.target.value)){
                // remove the element
                const index = newArr[i].correctAns.indexOf(e.target.value);
                newArr[i].correctAns.splice(index,1);
            }else{
                newArr[i].correctAns.push(e.target.value)
            }
        }else{
            newArr[i].correctAns[0] = e.target.value;
        }
        setQuestions([...newArr])
        console.log(newArr);
    }

    const handleSubmit = () =>{
        dispatch(quizAddAnsAndPoints({questions,quiz:quiz._id,totalPoints}))
    }

    useEffect(() => {
        if(!isAuthenticated){
            navigate(`/`)
        }
        if(quiz && Object.keys(quiz).length === 0 && !loading){
            navigate(`/quiz/${params.id}`);
        }
    }, [isAuthenticated,quiz, loading])
    

  return (
    <>
        {
            !loading && (
                <div className='cq3Page'>
                    <div className="cq3Intro">
                        <div className="cq3IntroSec1">
                            <div className="cq3IntroImgContainer">
                                <img src={`data:image/svg+xml;base64, ${quiz && quiz.image}`} alt="quiz image" />
                            </div>
                        </div>
                        <div className="cq3IntroSec2">
                            <h1>{quiz && quiz.name}</h1>
                            <h4>{quiz && quiz.field}</h4>
                            <h6>{totalPoints === 0? `No points alloted`:`${totalPoints} Points`}</h6>
                            <div>
                                <button className="cq3BtnEdit">Edit back</button>
                                <button className="cq3BtnDone" onClick={handleSubmit}>Done</button>
                            </div>
                        </div>
                    </div>
                    <div className="cq3Details">
                        <span>Description : </span>
                        {quiz && quiz.about}
                    </div>
                    <div className="cq3QuestionsSection">
                        {
                            questions.map((question,idx) => {
                                return (
                                    <div className="cq3QuestionBox" key={idx}>
                                        <div className="cq3-qb-qbbox">
                                            <div className="cq3-qb-question">
                                                <p>{question.question}</p>
                                            </div>
                                            <div className="cq3-qb-ob">
                                                {
                                                    question.options.map((option,index)=>{
                                                        return(
                                                                <div className="cq3-qb-ob-options" key={index}>
                                                                    <input type={question.type ==="mcq"?"checkbox":"radio"} id={`option-${idx}-${index}`} name={`${idx}`} value={option} onClick={(e)=>handleOptionClick(e,idx, index)} />
                                                                    <label htmlFor={`option-${idx}-${index}`}>{option}</label>
                                                                </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="cq3-qb-pointsbox">
                                            <input type="text" placeholder='Enter points' value={question.points} onChange={(e)=>handlePoints(e,idx)} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
    </>

  )
}

export default CreateQuizPage2
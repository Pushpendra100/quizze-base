import React,{useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getQuiz} from "../store/actions/quizActions";
import {userQuizSubmit} from "../store/actions/userActions"



const QuizTest = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading,quiz} = useSelector(state => state.quiz)
    const {user, isAuthenticated} = useSelector(state => state.user);

    const [pageLoading, setPageLoading]  = useState(false)
    const [responses, setResponses] = useState([]);

    
    useEffect(() => {
        dispatch(getQuiz(params.quizId))
        if(!isAuthenticated && !user){
            navigate(`/`)
        }
    }, []);




    const handleOptionClick = (e,i, i1) =>{
        let newArr = [...responses];
            if(newArr.length == 0){
                newArr = new Array(quiz.questions.length);
                for(let j = 0; j < quiz.questions.length; j++){
                    newArr[j] = [];
                }
                newArr[i][0] = e.target.value;
            }else{

                if(newArr[i].length === 0){
                    newArr[i][0] = e.target.value;
                }else{
                    if(quiz.questions[i].type === "mcq"){
                        if(newArr[i].includes(e.target.value)){
                            const index = newArr[i].indexOf(e.target.value);
                            newArr[i].splice(index,1);
                        }else{
                            newArr[i].push(e.target.value)
                        }
                    }else{
                        newArr[i][0] = e.target.value;
                    }
                }

            }

        setResponses([...newArr])
    }

    const handleSubmit = async() =>{
        setPageLoading(true);
        const response = await dispatch(userQuizSubmit({quizId:params.quizId,userId:user._id, responses}));
        if(response){
            // setPageLoading(false);
            navigate('/');
        }
    }


    

  return (
    <>
    {
        pageLoading?(<div>Loading</div>):(
            <div>
            {
                quiz && (
                    <div className='quizTest'>
                        <div className="quizTestIntro">
                            <div className="quizTestIntroSec1">
                                <div className="quizTestIntroImgContainer">
                                    <img src={`data:image/svg+xml;base64, ${quiz.image}`} alt="quiz image" />
                                </div>
                            </div>
                            <div className="quizTestIntroSec2">
                                <h1>{quiz.name}</h1>
                                <h4>{quiz.field}</h4>
                                <h6>{quiz.totalPoints === 0? `No points alloted`:`${quiz.totalPoints} Points`}</h6>
                                <div>
                                    <button className="quizTestBtnDone" onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>
                        </div>
                        <div className="quizTestQuestionsSection">
                            {
                            quiz.questions && quiz.questions.map((question,idx) => {
                                    return (
                                        <div className="quizTestQuestionBox" key={idx}>
                                            <div className="qt-qb-qbbox">
                                                <div className="qt-qb-question">
                                                    <p>{question.question}</p>
                                                </div>
                                                <div className="qt-qb-ob">
                                                    {
                                                        question.options.map((option,index)=>{
                                                            return(
                                                                    <div className="qt-qb-ob-options" key={index}>
                                                                        <input type={question.type ==="mcq"?"checkbox":"radio"} id={`option-${idx}-${index}`} name={`${idx}`} value={option} onClick={(e)=>handleOptionClick(e,idx, index)} />
                                                                        <label htmlFor={`option-${idx}-${index}`}>{option}</label>
                                                                    </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className="qt-qb-pointsbox">
                                                <span>{question.points} Points</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
            </div>
        )
    }
    </>

  )
}

export default QuizTest;
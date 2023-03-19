import React,{useEffect} from 'react';
import QuizTest from '../components/QuizTest';
import {useSelector, useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getQuizzesInfo} from "../store/actions/quizActions"
import {useAlert} from "react-alert";



const QuizIndividual = () => {

  const alert = useAlert()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const {isAuthenticated, user} = useSelector(state => state.user);
  const {loading, createdQuizzes, givenQuizzes, starredQuizzes} = useSelector(state => state.quizzes)

  useEffect(() => {
    if(user){
      dispatch(getQuizzesInfo(user._id)); //it will return created,given and starred quizes of the user
    }
  }, [user])

  useEffect(() => {
    if(!loading && createdQuizzes){
      let isCreatedQuiz = false;
      let isGivenQuiz = false;
  
      for (let i = 0; i < createdQuizzes.length; i++) {
          const quiz = createdQuizzes[i];
          if(quiz._id == params.quizId){
              isCreatedQuiz = true;
              break;
          };
      }
      for (let i = 0; i < givenQuizzes.length; i++) {
        const quiz = givenQuizzes[i];
        if(quiz._id == params.quizId){
          isGivenQuiz = true;
          break;
        };
      }

      if(isCreatedQuiz){
        alert.error("You are not allowed to attempt this quiz")
        navigate(`/`);
      }else{
        if(isGivenQuiz){
          alert.error("You are already attempted this quiz")
          navigate(`/`);
        }
      }

    }

  }, [loading])
  

  return (
    <div className='quizIndividualPage'>
        <QuizTest/>
    </div>
  )
}

export default QuizIndividual;
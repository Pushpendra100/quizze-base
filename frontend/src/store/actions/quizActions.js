import {
    CREATE_QUIZ_REQUEST,
    CREATE_QUIZ_SUCCESS,
    CREATE_QUIZ_FAIL,
    QUIZ_ADD_QUESTIONS_REQUEST,
    QUIZ_ADD_QUESTIONS_SUCCESS,
    QUIZ_ADD_QUESTIONS_FAIL,
    QUIZ_ADD_ANS_REQUEST,
    QUIZ_ADD_ANS_SUCCESS,
    QUIZ_ADD_ANS_FAIL,
    QUIZ_DETAILS_REQUEST,
    QUIZ_DETAILS_SUCCESS,
    QUIZ_DETAILS_FAIL,
    QUIZ_REQUEST,
    QUIZ_SUCCESS,
    QUIZ_FAIL,
    GET_QUIZZES_REQUEST,
    GET_QUIZZES_SUCCESS,
    GET_QUIZZES_FAIL,
    CLEAR_ERRORS
 } from "../constants/quizConstants";
 import axios from "axios";


export const createQuiz = (quizDetails) => async(dispatch) =>{
    try{
        dispatch({type:CREATE_QUIZ_REQUEST});

        const config = {headers:{"Content-Type":"application/json"}, withCredentials: true};

        const {data} = await axios.post(
            `/api/v1/quiz/create-quiz1`,
            quizDetails,
            config
        );
        
        dispatch({type:CREATE_QUIZ_SUCCESS,payload: data})

    }catch(error){
        dispatch({type:CREATE_QUIZ_FAIL,payload:error.response.data.message});
    } 

 };

export const quizAddQuestions = ({questions,quiz}) => async(dispatch) =>{
    try{
        dispatch({type:QUIZ_ADD_QUESTIONS_REQUEST});

        const config = {headers:{"Content-Type":"application/json"}, withCredentials: true};

        const {data} = await axios.post(
            `/api/v1/quiz/create-quiz2/${quiz}`,
            questions,
            config
        );
        
        dispatch({type:QUIZ_ADD_QUESTIONS_SUCCESS,payload: data})

    }catch(error){
        dispatch({type:QUIZ_ADD_QUESTIONS_FAIL,payload:error.response.data.message});
    } 

 };

export const quizAddAnsAndPoints = ({questions,quiz,totalPoints}) => async(dispatch) =>{
    try{
        dispatch({type:QUIZ_ADD_ANS_REQUEST});

        const config = {headers:{"Content-Type":"application/json"}, withCredentials: true};

        const {data} = await axios.post(
            `/api/v1/quiz/create-quiz3/${quiz}`,
            {questions, totalPoints},
            config
        );
        dispatch({type:QUIZ_ADD_ANS_SUCCESS,payload: data})

    }catch(error){
        dispatch({type:QUIZ_ADD_ANS_FAIL,payload:error.response.data.message});
    } 

 };

export const getQuizDetails = (quizId) => async(dispatch) =>{
    try{
        dispatch({type:QUIZ_DETAILS_REQUEST});

        const config = {headers:{"Content-Type":"application/json"}, withCredentials: true};

        const {data} = await axios.get(
            `/api/v1/quiz/quiz-details/${quizId}`,
            config
        );
        
        dispatch({type:QUIZ_DETAILS_SUCCESS,payload: data})

    }catch(error){
        dispatch({type:QUIZ_DETAILS_FAIL,payload:error.response.data.message});
    } 

 };

export const getQuiz = (quizId) => async(dispatch) =>{
    try{
        dispatch({type:QUIZ_REQUEST});

        const config = {headers:{"Content-Type":"application/json"}, withCredentials: true};

        const {data} = await axios.get(
            `/api/v1/quiz/${quizId}`,
            config
        );
        
        dispatch({type:QUIZ_SUCCESS,payload: data})

    }catch(error){
        dispatch({type:QUIZ_FAIL,payload:error.response.data.message});
    } 

 };

 export const getQuizzesInfo = (userId) => async(dispatch) =>{
    try {
        dispatch({type:GET_QUIZZES_REQUEST});

        const config = {headers:{"Content-Type":"application/json"}};

        const {data} = await axios.get(`/api/v1/quiz/${userId}/quizzes-info`, config);
        dispatch({
            type:GET_QUIZZES_SUCCESS,
            payload:data.quizzes,
    })
    } catch (error) {
        dispatch({
            type:GET_QUIZZES_FAIL,
            payload:error.response.data.message,
        });
    }
};

  // Clearing Errors
export const clearErrors = () => async(dispatch) =>{
    dispatch({
        type:CLEAR_ERRORS
    })
};
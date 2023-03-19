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


export const createQuizReducer = (state = {}, action) => {

    switch (action.type) {

        case CREATE_QUIZ_REQUEST:
        case QUIZ_ADD_QUESTIONS_REQUEST:
        case QUIZ_ADD_ANS_REQUEST:
            return{
                    loading:true,
            };
        case CREATE_QUIZ_SUCCESS:
        case QUIZ_ADD_QUESTIONS_SUCCESS:
        case QUIZ_ADD_ANS_SUCCESS:
            return{
                ...state,
                loading:false,
                quiz:action.payload,
            };   
        case CREATE_QUIZ_FAIL:
        case QUIZ_ADD_QUESTIONS_FAIL:
        case QUIZ_ADD_ANS_FAIL:
            return{
                ...state,
                loading:false,
                quiz:null,
                error:action.payload,
            };   
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };

        default:
            return state
    }

}
export const quizReducer = (state = {}, action) => {

    switch (action.type) {

        case QUIZ_DETAILS_REQUEST:
        case QUIZ_REQUEST:
            return{
                    loading:true,
            };
        case QUIZ_DETAILS_SUCCESS:
        case QUIZ_SUCCESS:
            return{
                ...state,
                loading:false,
                quiz:action.payload,
            };   
        case QUIZ_DETAILS_FAIL:
        case QUIZ_FAIL:
            return{
                ...state,
                loading:false,
                quiz:null,
                error:action.payload,
            };   
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };

        default:
            return state
    }

}
export const quizzesReducer = (state = {}, action) => {

    switch (action.type) {

        case GET_QUIZZES_REQUEST:
            return{
                    loading:true,
            };
        case GET_QUIZZES_SUCCESS:
            return{
                ...state,
                loading:false,
                createdQuizzes:action.payload.createdQuizzes,
                givenQuizzes:action.payload.givenQuizzes,
                starredQuizzes:action.payload.starredQuizzes,
            };   
        case GET_QUIZZES_FAIL:
            return{
                ...state,
                loading:false,
                createdQuizzes:null,
                givenQuizzes:null,
                starredQuizzes:null,
                error:action.payload,
            };   
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };

        default:
            return state
    }

}

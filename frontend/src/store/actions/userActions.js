import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGOUT_SUCCESS,
    CLEAR_ERRORS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_USERNAME_REQUEST,
    USER_USERNAME_SUCCESS,
    USER_USERNAME_FAIL,
 } from "../constants/userConstants";
 import axios from "axios";


 export const login = (user) => async(dispatch) =>{
    try{
        dispatch({type:LOGIN_REQUEST});

        const config = {headers:{"Content-Type":"application/json"}};

        const {data} = await axios.post(        
            `/api/v1/user/login`,
            user,
            config
        );
        
        dispatch({type:LOGIN_SUCCESS,payload: data.user})

    }catch(error){
        dispatch({type:LOGIN_FAIL,payload:error.response.data.message});
    } 

 };

 export const logout = () => async(dispatch) =>{
    try{
        const config = {headers:{"Content-Type":"application/json"}};

        await axios.get(
            `/api/v1/user/logout`,
            config
        );
        
        dispatch({type:LOGOUT_SUCCESS})

    }catch(error){
        dispatch({type:CLEAR_ERRORS})
    } 

 };


 export const register = ({user, avatar}) => async(dispatch) =>{

    try {
        dispatch({type:REGISTER_USER_REQUEST});
        
        const config = {headers:{"Content-Type":"application/json"}};
        const {data} = await axios.post(`/api/v1/user/register`,{user, avatar}, config);
        console.log('data',data);
        dispatch({type:REGISTER_USER_SUCCESS,payload:data.user});

    } catch (error) {
        dispatch({type:REGISTER_USER_FAIL,payload:error.response.data.message})
    }

 };
 export const getUser = () => async(dispatch) =>{
    try {
        dispatch({type:USER_DETAILS_REQUEST});

        const config = {headers:{"Content-Type":"application/json"}};
        const {data} = await axios.get(`/api/v1/user/me`, config);
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data.user,
    })
    } catch (error) {
        dispatch({
            type:USER_DETAILS_FAIL,
            // payload:error.response.data.message,            
        });
    }
};
 export const getUsersUsername = () => async(dispatch) =>{
    try {
        dispatch({type:USER_USERNAME_REQUEST});

        const config = {headers:{"Content-Type":"application/json"}};

        const {data} = await axios.get(`/api/v1/user/users/username`, config);
        dispatch({
            type:USER_USERNAME_SUCCESS,
            payload:data.users,
    })
    } catch (error) {
        dispatch({
            type:USER_USERNAME_FAIL,
            payload:error.response.data.message,
        });
    }
};

export const removeHalfQuizes = (userId) => async(dispatch) =>{
    try{
        const config = {headers:{"Content-Type":"application/json"}, withCredentials: true};
        await axios.delete(
            `/api/v1/user/${userId}/half-quizes`,
            config
        );
    }catch(error){
        dispatch({
            type:CLEAR_ERRORS
        })
    } 

 };

 export const userQuizSubmit = ({quizId,userId, responses}) => async(dispatch) =>{
    try {
        const config = {headers:{"Content-Type":"application/json"}};
        console.log({quizId, userId, responses});
        const {data} = await axios.post(`/api/v1/user/quiz-submit/${quizId}`,{userId, responses}, config);
    } catch (error) {
        console.log(error.response.data);
        // dispatch({
        //     type:CLEAR_ERRORS
        // })
    }
};

export const clearErrors = () => async(dispatch) =>{
    dispatch({
        type:CLEAR_ERRORS
    })
};
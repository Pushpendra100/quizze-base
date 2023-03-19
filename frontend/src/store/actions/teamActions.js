import {
    CREATE_TEAM_REQUEST,
    CREATE_TEAM_SUCCESS,
    CREATE_TEAM_FAIL,
    GET_TEAM_REQUEST,
    GET_TEAM_SUCCESS,
    GET_TEAM_FAIL,
    GET_USER_TEAMS_REQUEST,
    GET_USER_TEAMS_SUCCESS,
    GET_USER_TEAMS_FAIL,
    GET_TEAMS_NAME_REQUEST,
    GET_TEAMS_NAME_SUCCESS,
    GET_TEAMS_NAME_FAIL,
    GET_ALL_TEAMS_REQUEST,
    GET_ALL_TEAMS_SUCCESS,
    GET_ALL_TEAMS_FAIL,
    CLEAR_ERRORS,
 } from "../constants/teamConstants";
 import axios from "axios";

export const createTeam = ({team,userId}) => async(dispatch) =>{
    try {
        dispatch({type:CREATE_TEAM_REQUEST});

        const config = {headers:{"Content-Type":"application/json"}};
        const {data} = await axios.post(`/api/v1/team/create-team/${userId}`,team, config);
        dispatch({
            type:CREATE_TEAM_SUCCESS,
            payload:data.team,
    })
    } catch (error) {
        dispatch({
            type:CREATE_TEAM_FAIL,
            payload:error.response.data.message,
        });
    }
};

export const getTeam = (teamId) => async(dispatch) =>{
    try {
        dispatch({type:GET_TEAM_REQUEST});

        const config = {headers:{"Content-Type":"application/json"}};
        const {data} = await axios.get(`/api/v1/team/${teamId}`,config);
        dispatch({
            type:GET_TEAM_SUCCESS,
            payload:data.team,
    })
    } catch (error) {
        dispatch({
            type:GET_TEAM_FAIL,
            payload:error.response.data.message,
        });
    }
};

export const getUserTeams = (userId) => async(dispatch) =>{
    try {
        dispatch({type:GET_USER_TEAMS_REQUEST});

        const config = {headers:{"Content-Type":"application/json"}};
        const {data} = await axios.get(`/api/v1/team/teams/${userId}`,config);
        dispatch({
            type:GET_USER_TEAMS_SUCCESS,
            payload:data.teams,
    })
    } catch (error) {
        dispatch({
            type:GET_USER_TEAMS_FAIL,
            payload:error.response.data.message,
        });
    }
};
export const getTeamsName = () => async(dispatch) =>{
    try {
        dispatch({type:GET_TEAMS_NAME_REQUEST});
        const config = {headers:{"Content-Type":"application/json"}};
        const {data} = await axios.get(`/api/v1/team/all-teams/teamNames`,config);
        dispatch({
            type:GET_TEAMS_NAME_SUCCESS,
            payload:data.teams,
    })
    } catch (error) {
        dispatch({
            type:GET_TEAMS_NAME_FAIL,
            payload:error.response.data.message,
        });
    }
};
export const getAllTeams = () => async(dispatch) =>{
    try {
        dispatch({type:GET_ALL_TEAMS_REQUEST});
        const config = {headers:{"Content-Type":"application/json"}};
        const {data} = await axios.get(`/api/v1/team/all`,config);
        dispatch({
            type:GET_ALL_TEAMS_SUCCESS,
            payload:data.teams,
    })
    } catch (error) {
        dispatch({
            type:GET_ALL_TEAMS_FAIL,
            payload:error.response.data.message,
        });
    }
};
export const clearErrors = () => async(dispatch) =>{
    dispatch({
        type:CLEAR_ERRORS
    })
};
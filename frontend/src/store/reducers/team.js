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
    CLEAR_ERRORS
 } from "../constants/teamConstants";

export const teamReducer = (state = {}, action) => {

    switch (action.type) {

        case CREATE_TEAM_REQUEST:
        case GET_TEAM_REQUEST:
            return{
                    loading:true,
            };
        case CREATE_TEAM_SUCCESS:
        case GET_TEAM_SUCCESS:
            return{
                ...state,
                loading:false,
                team:action.payload,
            };   
        case CREATE_TEAM_FAIL:
        case GET_TEAM_FAIL:
            return{
                ...state,
                loading:false,
                team:null,
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
export const teamsReducer = (state = {}, action) => {

    switch (action.type) {

        case GET_ALL_TEAMS_REQUEST:
        case GET_USER_TEAMS_REQUEST:
        case GET_TEAMS_NAME_REQUEST:
            return{
                    loading:true,
            };
        case GET_ALL_TEAMS_SUCCESS:
        case GET_USER_TEAMS_SUCCESS:
        case GET_TEAMS_NAME_SUCCESS:
            return{
                ...state,
                loading:false,
                teams:action.payload,
            };   
        case GET_ALL_TEAMS_FAIL:
        case GET_USER_TEAMS_FAIL:
        case GET_TEAMS_NAME_FAIL:
            return{
                ...state,
                loading:false,
                teams:null,
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

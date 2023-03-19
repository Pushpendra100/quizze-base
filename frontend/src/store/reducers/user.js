import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_REQUEST,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_USERNAME_REQUEST,
    USER_USERNAME_SUCCESS,
    USER_USERNAME_FAIL,
    LOGOUT_SUCCESS,
    CLEAR_ERRORS
 } from "../constants/userConstants";

 const DEFAULT_STATE = {
    isAuthenticated:false,
    user:{}, 
};

export const userReducer = (state = DEFAULT_STATE, action) => {

    switch (action.type) {

        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case USER_DETAILS_REQUEST:
            return{
                    loading:true,
                    isAuthenticated: false,
            };
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case USER_DETAILS_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload,
            };   
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
        case USER_DETAILS_FAIL:
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload,
            };   
        case LOGOUT_SUCCESS:
            return{
                user:null
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };

        default:
            return state
    }

}

export const usersReducer = (state = {}, action) => {

    switch (action.type) {

        case USER_USERNAME_REQUEST:
            return{
                    loading:true,
            };
        case USER_USERNAME_SUCCESS:
            return{
                ...state,
                loading:false,
                users:action.payload,
            }; 
        case USER_USERNAME_FAIL:
            return{
                ...state,
                loading:false,
                users:null,
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

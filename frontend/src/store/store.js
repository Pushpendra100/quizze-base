import {createStore,combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import { userReducer, usersReducer } from "./reducers/user.js";
import { createQuizReducer, quizReducer, quizzesReducer } from "./reducers/quiz.js";
import {  teamReducer, teamsReducer } from "./reducers/team.js";

const reducer = combineReducers({
    user:userReducer,
    users: usersReducer,
    createQuiz:createQuizReducer,
    quiz:quizReducer,
    quizzes:quizzesReducer,
    team:teamReducer,
    teams:teamsReducer
});

let initialState = {};
const middleware = [thunk]; 

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
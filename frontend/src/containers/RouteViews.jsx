import React from 'react';
import {Routes,Route} from "react-router-dom";
import Home from "../pages/Home";
import Login from '../pages/Login';
import My404Page from "../pages/My404Page";
import QuizPage from '../pages/QuizPage';
import Register from '../pages/Register';
import TeamPage from '../pages/TeamPage';
import UserProfilePage from '../pages/UserProfilePage';
import UserTeamsPage from '../pages/UserTeamsPage';
import UserNotificationsPage from '../pages/UserNotificationsPage';
import CreateQuizPage from '../pages/CreateQuizPage';
import CreateQuizPage2 from '../pages/CreateQuizPage2';
import CreateQuizPage3 from '../pages/CreateQuizPage3';
import JoinQuiz from '../pages/JoinQuiz';
import QuizIndividual from '../pages/QuizIndividual';
import CreateTeamPage from '../pages/CreateTeamPage';
import QuizTeam from '../pages/QuizTeam';

const RouteViews = () => {
  return (
    <main>
      <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/:username/profile" element={<UserProfilePage/>} />
            <Route exact path="/:username/teams" element={<UserTeamsPage/>} />
            <Route exact path="/:username/notifications" element={<UserNotificationsPage/>} />
            <Route exact path="/quiz/:id" element={<QuizPage/>} />
            <Route exact path="/team/:teamId" element={<TeamPage/>} />
            <Route exact path="/:username/create-quiz" element={<CreateQuizPage/>} />
            <Route exact path="/:username/create-quiz2/:id" element={<CreateQuizPage2/>} />
            <Route exact path="/:username/create-quiz3/:id" element={<CreateQuizPage3/>} />
            <Route exact path="/join-quiz/:id" element={<JoinQuiz/>} />
            <Route exact path="/quiz-attempt/:quizId" element={<QuizIndividual/>} />
            <Route exact path="/quiz-attempt/:quizId/team/:teamId" element={<QuizTeam/>} />
            <Route exact path="/:username/create-team" element={<CreateTeamPage/>} />
            <Route path='*' exact={true} element={<My404Page/>} />
        </Routes>
    </main>
  )
}

export default RouteViews;
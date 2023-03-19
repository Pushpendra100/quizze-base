import React, { Fragment } from 'react';
import Navbar from '../components/Navbar';
import MetaData from '../containers/MetaData';
import Sidebar from '../components/Sidebar';
import Quiz from '../components/Quiz';
import { useParams } from 'react-router-dom';


const QuizPage = () => {

  const params = useParams();
    
  return (
    <Fragment>
      <MetaData title="Quizze | Home" />
        <div className="page">
            <Navbar/>
            <div className="pageContainer">
                <div className="pageContainerBar">
                    <Sidebar/>
                </div>
                <div className="pageContainerSection">
                    <Quiz quizId={params.id}/>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default QuizPage;
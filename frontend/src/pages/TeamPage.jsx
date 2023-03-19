import React, { Fragment } from 'react';
import Navbar from '../components/Navbar';
import MetaData from '../containers/MetaData';
import Sidebar from '../components/Sidebar';
import Team from '../components/Team';

const TeamPage = () => {

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
                    <Team/>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default TeamPage;
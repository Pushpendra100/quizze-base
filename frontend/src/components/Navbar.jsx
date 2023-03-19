import React, { Fragment } from 'react';
import {Link} from "react-router-dom";
import Logout from './Logout';


const Navbar = () => {
  return (
        <div className="mainNavbar">
          <div className="mainNavOptions">
            <ul className="mainNavList">
              <li><Link className='mainNavLink' to='/qtracks'>QTracks</Link></li>
              <li><Link className='mainNavLink' to='/livequiz'>Quiz</Link></li>
              <Logout/>
            </ul>
          </div>
          <div className="mainNavLogo">
            {/* First letter of name and sirname of user to be put here */}
            pp
          </div> 
        </div>
  )
}

export default Navbar
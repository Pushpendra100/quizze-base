import React from 'react';
import {Link} from "react-router-dom"
import DeleteIcon from '@mui/icons-material/Delete';

const UserNotifications = () => {
  return (
    <div className='userNotifications'>
        <div className="notification notificationActive">
            <div className="notificationContent">
              <p><Link className='notificationContentLink'>Raptor Rio</Link> has invited you for a 10min quiz which will end on 4 Aug 2022</p>

            </div>
            <div className="notificationEdit">
              <DeleteIcon/>
            </div>
        </div>
        <div className="notification">
            <div className="notificationContent">
              <p><Link className='notificationContentLink'>Raptor Rio</Link> has invited you for a 10min quiz which will end on 4 Aug 2022</p>

            </div>
            <div className="notificationEdit">
              <DeleteIcon/>
            </div>
        </div>
        <div className="notification">
            <div className="notificationContent">
              <p><Link className='notificationContentLink'>Raptor Rio</Link> has invited you for a 10min quiz which will end on 4 Aug 2022</p>

            </div>
            <div className="notificationEdit">
              <DeleteIcon/>
            </div>
        </div>
        <div className="notification">
            <div className="notificationContent">
              <p><Link className='notificationContentLink'>Raptor Rio</Link> has invited you for a 10min quiz which will end on 4 Aug 2022</p>

            </div>
            <div className="notificationEdit">
              <DeleteIcon/>
            </div>
        </div>
     
    </div>
  )
}

export default UserNotifications;
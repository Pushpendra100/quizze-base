import React from 'react';
import { GoogleLogout } from 'react-google-login';
const client_id = "136972860469-3mhe264sa6vr1gbr972i8074q4pbgbo4.apps.googleusercontent.com";



const Logout = () => {

    const onSuccess = (res) =>{
        console.log("Logout successfull");
    }


  return (
    <div className='GoogleLogoutBtn'> 
        <GoogleLogout
            clientId={client_id}
            buttonText="Logout"
            onSuccess={onSuccess}
        />
    </div>
  )
}

export default Logout;
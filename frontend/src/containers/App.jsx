import React,{useEffect} from 'react';
import WebFont from "webfontloader";
import {BrowserRouter as Router} from "react-router-dom";
import {useDispatch} from "react-redux";
import { getUser } from '../store/actions/userActions';
import {gapi} from "gapi-script";

import RouteViews from './RouteViews';

const client_id = "136972860469-3mhe264sa6vr1gbr972i8074q4pbgbo4.apps.googleusercontent.com";



const App = () =>{

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [])

  useEffect(() => {
    function start(){
      gapi.client.init({
        clientId: client_id,
        scope:""
      })
    };

    gapi.load('client:auth2',start)
  }, [])


  

  WebFont.load({
    google:{
      families:["Abel","Roboto", "Snowburst One"]
    }
  })

    return (
      <Router>
         <RouteViews/>
      </Router>
    )
}

export default App;

//Renders the HomepageApp component on homepage.html
import React from 'react';
import ReactDOM from 'react-dom';
import HomepageApp from './Components/HomepageApp.jsx';
import CreateEventApp from './Components/CreateEventApp.jsx';
import WhatToBring from './Components/WhatToBring.jsx';
import { Router, Route, hashHistory } from 'react-router';


//render react router
ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={HomepageApp}/>
    <Route path="/create" component={CreateEventApp}/>
    <Route path="/wtb" component={WhatToBring}/>
  </Router>
),document.getElementById('app'));



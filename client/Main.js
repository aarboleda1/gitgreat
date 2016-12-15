//Renders the HomepageApp component on homepage.html
import React from 'react';
import ReactDOM from 'react-dom';
import HomepageApp from './Components/HomepageApp.jsx';
import CreateEventApp from './Components/CreateEventApp.jsx';
import WhatToBring from './Components/WhatToBring.jsx';
import Reminders from './Components/Reminders.jsx';
import Photos from './Components/Photos.jsx';
import { Router, Route, hashHistory } from 'react-router';



ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={HomepageApp}/>
      <Route path="/create" component={CreateEventApp}/>
      <Route path="/wtb" component={WhatToBring}/>
      <Route path="/reminders" component={Reminders}/>
      <Route path="/photos" component={Photos}/>      
  </Router>
),document.getElementById('app'))



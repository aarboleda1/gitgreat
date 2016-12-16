//Renders the HomepageApp component on homepage.html
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App.jsx';
import CreateEventApp from './Components/CreateEventApp.jsx';
import Login from './Components/Login.jsx';
import WhatToBring from './Components/WhatToBring.jsx';
import Reminders from './Components/Reminders.jsx';
import FeatureNavigation from './Components/FeatureNavigation.jsx';
import Details from './Components/Details Page/Details.jsx';
import Transportation from './Components/Transportation Page/Transportation.jsx';
import EventList from './Components/EventList.jsx';
import EventPlanning from './Components/EventPlanning.jsx';
import PickADate from './Components/PickADatePage/PickADate.jsx';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

var propsToDetails = {
  username: 'Nick',
  isPlanner: true,
  eventDescription: 'Party time at Hack Reactor',
  eventLocation: '944 Market Street',
  eventName: 'testname'
};

var propsToTransportation = {
  username: 'Nick',
  eventLocation: '944 Market Street'
};

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
      <Route path="/login" component={Login}/>
      <Route path="/home" component={Details}/>
      <Route path="/wtb" component={WhatToBring}/>
      <Route path="/reminders" component={Reminders}/>
      <Route path="/featnav" component={FeatureNavigation}/>
      <Route path="/eventlist" component={EventList}/>
      <Route path="/eventPlanning" component={EventPlanning}/>
      <Route path="/create" component={CreateEventApp}/>
<<<<<<< HEAD
      <Route path="/pickADate" component={PickADate}/>
=======
      <Route path="/transportation" propsToTransportation={propsToTransportation} component={Transportation}/>
>>>>>>> Refactor transportation for webpack
  </Router>
), document.getElementById('app'));
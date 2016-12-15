//Child component within the Event Planning component
//Allows user to navigate between the event planning details
import React from 'react';
import { Link } from 'react-router'

var FeatureNavigation = (props) => (
  <div className="mySidenav">
    <ul id="slide-out" className="side-nav" onClick={() => props.closeNav()}>
      <li><Link to="/wtb">What To Bring</Link></li>
      <li><Link to="/reminders">Reminders</Link></li>
      <li><Link to="/photos">Photos</Link></li>
      <li><a>Close Navigation</a></li>    
    </ul>
    <a href="#" data-activates="slide-out" className="button-collapse"><i onClick={() => props.openNav()} className="material-icons">Navigation</i></a>
  </div>
);

export default FeatureNavigation;


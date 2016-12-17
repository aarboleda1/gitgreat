import React from 'react';
import { slide as Menu } from 'react-burger-menu';

var FeatureNavigation = (props) => (
  <div id="eventNav">
    <button href='#' id="firstBtn" className="detailsBtn" onClick={(e) => props.changeDisplay(e)}>Home</button>
    <button href='#' className="wtbBtn" onClick={(e) => props.changeDisplay(e)}>What To Bring</button>
    <button href='#' className="reminderBtn" onClick={(e) => props.changeDisplay(e)}>Reminders</button>
    <button href='#' className="transportationBtn" onClick={(e) => props.changeDisplay(e)}>Transportation</button>
    <button href='#' className="dateBtn" onClick={(e) => props.changeDisplay(e)}>Date</button>
  </div>
);

export default FeatureNavigation;
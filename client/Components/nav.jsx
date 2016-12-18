//Child component within the HomepageApp and the CreateEventApp to toggle 
//between the two App pages.
import React from 'react';
import { Link } from 'react-router';


var Nav = (props) => (
  <div className="nav">
    <a href='#' onClick={() => (props.changePage('events'))} className="title">Friends</a>
    <a href='#' onClick={() => (props.changePage('events'))}>Home</a>
    <a href='#' onClick={() => (props.changePage('createEvent'))}>Create Event</a>
    <a href='/'>Log In</a>
  </div>
  );

export default Nav;


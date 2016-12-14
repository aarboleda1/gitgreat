//Child component within the HomepageApp and the CreateEventApp to toggle 
//between the two App pages.
import React from 'react';

var Nav = () => (
  <div className="nav">
  	<a href='/' className="title">Friends</a>
    <a href='/'>Home </a>
    <a href='/create'>Create Event</a>
    <a href='#'>Log In</a>
  </div>
);

export default Nav;

//Child component within the HomepageApp and the CreateEventApp to toggle 
//between the two App pages.
import React from 'react';
import { Link } from 'react-router'


var Nav = () => (
  <div className="nav">
  	<a href='/' className="title"><Link to="/">Friends</Link></a>
    <a href='/'><Link to="/">Home</Link> </a>
    <a><Link to="/create">Create Event</Link></a>
    <a href='#'>Log In</a>
  </div>
);

export default Nav;


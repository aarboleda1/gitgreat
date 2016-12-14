//Renders the HomepageApp component on homepage.html
import React from 'react';
import ReactDOM from 'react-dom';
import HomepageApp from './Components/HomepageApp.jsx';
import CreateEventApp from './Components/CreateEventApp.jsx'

ReactDOM.render(
  <CreateEventApp />, 
  document.getElementById('CreateEventApp') 
);



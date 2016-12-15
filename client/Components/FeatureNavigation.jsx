import React from 'react';
import { stack as Menu } from 'react-burger-menu';
import { Link } from 'react-router';
import Radium from 'radium';

let RadiumLink = Radium(Link);
class FeatureNavigation extends React.Component {
  render() {
    return (
      <Menu>
        <RadiumLink className="wtb" to="/wtb">What To Bring</RadiumLink>
        <RadiumLink className="reminders" to="/reminders">Reminders</RadiumLink>
      </Menu>
    );
  }
};

export default FeatureNavigation;



<<<<<<< HEAD
=======
var FeatureNavigation = (props) => (
  // var sidebarClass = this.props.isOpen ? 'sidebar open' : 'sidebar';
  <div className="mySidenav">
  <ul id="slide-out" className="side-nav" onClick={() => props.closeNav()}>
    <li><a href='#' className="homeBtn" value="homeBtn" onClick={(e) => props.changeDisplay(e)}>Home</a></li>
    <li><a href='#' className="wtbBtn" id="firstBtn" value="whatToBringBtn" onClick={(e) => props.changeDisplay(e)}>What To Bring</a></li>
    <li><a href='#' className="reminderBtn" value="reminderBtn" onClick={(e) => props.changeDisplay(e)}>Reminders</a></li>
    <li><a href='#' className="transportationBtn" value="transportationBtn" onClick={(e) => props.changeDisplay(e)}>Transportation</a></li>
    <li><a>Close Navigation</a></li>    
  </ul>
    <a href="#" data-activates="slide-out" className="button-collapse"><i onClick={() => props.openNav()} className="material-icons">Navigation</i></a>
  </div>
);
>>>>>>> Work on front-end for details page and transportation page


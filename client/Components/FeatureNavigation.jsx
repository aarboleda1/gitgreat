import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router';
import Radium from 'radium';

let RadiumLink = Radium(Link);
class FeatureNavigation extends React.Component {

  render() {
  var styles = {
    bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        left: '36px',
        top: '36px'
    },
    bmBurgerBars: {
        background: '#373a47'
    },
    bmCrossButton: {
        height: '24px',
        width: '24px'
    },
    bmCross: {
        background: '#bdc3c7'
    },
    bmMenu: {
        background: '#373a47',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em'
    },
    bmMorphShape: {
        fill: '#373a47'
    },
    bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    }
  };
    return (
      <Menu
        className="side-nav"
      >
        <RadiumLink className="home" to="/home">Home</RadiumLink>
        <RadiumLink className="wtb" to="/wtb">What To Bring</RadiumLink>
        <RadiumLink className="transportation" to="/transportation">Transportation</RadiumLink>
        <RadiumLink className="reminders" to="/reminders">Reminders</RadiumLink>
      </Menu>
    );
  }
};

export default FeatureNavigation;
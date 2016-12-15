//Child component contained within HomepageApp
//Contains the event planning navigation bar
import React from 'react';
import FeatureNavigation from './FeatureNavigation.jsx';
import WhatToBring from './WhatToBring.jsx';
import Activities from './Activities.jsx';
import Reminders from './Reminders.jsx';

class EventPlanning extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      tab: false
    };

    this.changeDisplay = this.changeDisplay.bind(this);
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }
  
  changeDisplay(e) {
    console.log('dont click')
    console.log(e.target.className);
    this.setState({
      tab: e.target.className
    });
  }

  openNav() {
    console.log('openNav in EventPlanning.jsx')
    document.getElementById("slide-out").style.width = "285px";
    console.log(document.getElementById("slide-out").style.width);
  }

  closeNav() {
    console.log('NAV BAR CLICKED')
    document.getElementById("slide-out").style.width = "0";
  }


  render () {
    var view;
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
    }
    if (this.state.tab === 'wtbBtn') {
      view = <WhatToBring featuredEvent={this.props.featuredEvent}/>;
    } else if (this.state.tab === 'activitiesBtn') {
      view = <Activities />;
    } else if (this.state.tab === 'reminderBtn') {
      view = <Reminders featuredEvent={this.props.featuredEvent}/>;
    } 
    return (
      <div>      
        {/*<h2 className="eventHeader">{this.props.featuredEvent.name} | {this.props.featuredEvent.where} | {this.props.featuredEvent.when}</h2>*/}
        <FeatureNavigation styles={styles} openNav={this.openNav} closeNav={this.closeNav} changeDisplay={this.changeDisplay} />
        {view}
      </div>     
    ) 
  }


}

// this is where to display the nav bar
export default EventPlanning;


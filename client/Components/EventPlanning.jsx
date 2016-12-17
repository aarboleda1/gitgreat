//Child component contained within HomepageApp
//Contains the event planning navigation bar
import React from 'react';
import Details from './Details Page/Details.jsx';
import Transportation from './Transportation Page/Transportation.jsx';
import FeatureNavigation from './FeatureNavigation.jsx';
import WhatToBring from './WhatToBring.jsx';
import Activities from './Activities.jsx';
import Reminders from './Reminders.jsx';
import PickADate from './PickADatePage/PickADate.jsx';

class EventPlanning extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      tab: false
    };

    this.changeDisplay = this.changeDisplay.bind(this);
  }
  
  changeDisplay(e) {
    this.setState({
      tab: e.target.className
    });
  }

  render () {
    var view;
    
    var propsToDetails = {
      username: 'Nick',
      isPlanner: true,
      eventDescription: 'Party time at Hack Reactor',
      eventLocation: 'aaa',
      eventName: this.props.featuredEvent.name
    };

    var propsToTransportation = {
      username: 'Nick',
      eventLocation: '944 Market Street'
    };

    var view = <Details propsToDetails={propsToDetails} />;
    if (this.state.tab === 'detailsBtn') {
      view = <Details propsToDetails={propsToDetails} />;
    } else if (this.state.tab === 'wtbBtn') {
      view = <WhatToBring featuredEvent={this.props.featuredEvent}/>;
    } else if (this.state.tab === 'reminderBtn') {
      view = <Reminders featuredEvent={this.props.featuredEvent}/>;
    } else if (this.state.tab === 'transportationBtn') {
      view = <Transportation propsToTransportation={propsToTransportation} />;
    } else if (this.state.tab === 'dateBtn') {
      view = <PickADate />;
    }

    return (
      <div>
        <FeatureNavigation changeDisplay={this.changeDisplay} />
        {view}
      </div>    
    );
  }
}

// this is where to display the nav bar
export default EventPlanning;


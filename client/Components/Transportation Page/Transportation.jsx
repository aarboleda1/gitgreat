import React from 'react';
import $ from 'jquery';
import TransportationMap from './TransportationMap.jsx';
import TransportationRides from './TransportationRides.jsx';
import FeatureNavigation from '../FeatureNavigation.jsx';
import Nav from '../nav.jsx';


// Location, address, and username needs to be passed down
class Transportation extends React.Component {
  constructor(props) {
    super(props);
    this.currentProps = this.props.route.propsToTransportation;
  }

  render() {
    var propsToTransportationMap = {
      eventLocation: this.currentProps.eventLocation
    };

    var propsToTransportationRides = {
      username: this.currentProps.username
    };

    return (
      <div>

        <div className="nav-container">
          <Nav/>
        </div>

        <div id="outer-container" style={{'position': 'fixed', 'left': '225px'}}>
          <FeatureNavigation />
        </div>

        <div className="container" style={{'marginLeft': '400px'}}>

          <div className="transportation-map row">
            <TransportationMap propsToTransportationMap={propsToTransportationMap} />
          </div>

          <div className="volunteer-form row">
            <TransportationRides propsToTransportationRides={propsToTransportationRides} />
          </div>

        </div>

      </div>
    );
  }

}

export default Transportation;
import React from 'react';
import $ from 'jquery';
import TransportationMap from './TransportationMap.jsx';
import TransportationRides from './TransportationRides.jsx';


// Location, address, and username needs to be passed down
class Transportation extends React.Component {
  constructor(props) {
    super(props);
    this.currentProps = this.props.propsToTransportation;
  }

  render() {
    var propsToTransportationMap = {
      eventLocation: this.currentProps.eventLocation
    };

    var propsToTransportationRides = {
      username: this.currentProps.username,
      eventName: this.currentProps.eventName
    };

    return (
      <div>

        <div className="container" style={{'margin': '0 auto'}}>

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
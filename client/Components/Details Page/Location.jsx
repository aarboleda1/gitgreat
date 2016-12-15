import React from 'react';
import $ from 'jquery';

// Needed props: Location name, address, isPlanner
class Location extends React.Component {
  constructor(props) {
    super(props);
    this.currentProps = this.props.propsToLocation;

    this.state = {
      eventLocation: this.currentProps.eventLocation,
      eventAddress: this.currentProps.eventAddress
    };

    this.handleLocationEdit = this.handleLocationEdit.bind(this);
    this.handleAddressEdit = this.handleAddressEdit.bind(this);
  }

  handleLocationEdit() {
    var newLocation = prompt('New Location:');

    this.setState({
      eventLocation: newLocation
    });

    // Send a put request to the server to edit the address of the event
    $.ajax({
      method: 'PUT',
      url: '/editeventlocation',
      data: newLocation
    });
  }

  handleAddressEdit() {
    var newAddress = prompt('New Address:');

    this.setState({
      eventAddress: newAddress
    });

    // Send a put request to the server to edit the address of the event
    $.ajax({
      method: 'PUT',
      url: '/editeventaddress',
      data: newAddress
    });
  }

  render() {
    var view;

    var API_KEY = 'AIzaSyC5jq_3YTRuafmiAx6OJ7fQGPPcWVc26m0';
    var source = 'https://www.google.com/maps/embed/v1/place?key=' + API_KEY + '&q=' + this.state.eventAddress;

    if (this.currentProps.isPlanner) {
      view = (
        <div className="location-box">
          <h3>Where: {this.state.eventLocation} <img onClick={this.handleLocationEdit} style={{'width': '35px'}} src="../assets/edit.png" /></h3>
          <div>
            <iframe
              width="400" height="250" frameBorder="0" style={{border: 0}}
              src={source} allowFullScreen>
            </iframe>
          </div>
          {this.state.eventAddress} <img onClick={this.handleAddressEdit} style={{'width': '15px'}} src="../public/assets/edit.png" />
        </div>
      );
    } else {
      view = (
        <div className="location-box">
          <h3>Where: {this.state.eventLocation}</h3>
          <div>
            <iframe
              width="400" height="250" frameBorder="0" style={{border: 0}}
              src={source} allowFullScreen>
            </iframe>
          </div>
          {this.state.eventAddress}
        </div> 
      );
    }
    return view;
  }
}

export default Location;
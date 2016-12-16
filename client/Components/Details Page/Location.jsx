import React from 'react';
import $ from 'jquery';

// Needed props: Location address, isPlanner
class Location extends React.Component {
  constructor(props) {
    super(props);
    this.currentProps = this.props.propsToLocation;

    this.state = {
      eventLocation: this.currentProps.eventLocation,
    };

    this.handleLocationEdit = this.handleLocationEdit.bind(this);
  }

  handleLocationEdit() {
    var newLocation = prompt('New Location:');

    this.setState({
      eventLocation: newLocation
    });

    // Send a put request to the server to edit the address of the event
    var putData = {
      original: this.currentProps.eventLocation,
      new: newLocation
    };

    $.ajax({
      method: 'PUT',
      url: '/editeventlocation',
      data: putData
    });
  }

  render() {
    var view;

    var API_KEY = 'AIzaSyC5jq_3YTRuafmiAx6OJ7fQGPPcWVc26m0';
    var source = 'https://www.google.com/maps/embed/v1/place?key=' + API_KEY + '&q=' + this.state.eventLocation;

    if (this.currentProps.isPlanner) {
      view = (
        <div className="location-box">
          <h3>Where: {this.state.eventLocation} <img onClick={this.handleLocationEdit} style={{'width': '35px'}} src="http://www.iconsfind.com/wp-content/uploads/2013/11/Editing-Edit-icon.png" /></h3>
          <div>
            <iframe
              width="400" height="250" frameBorder="0" style={{border: 0}}
              src={source} allowFullScreen>
            </iframe>
          </div>
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
        </div> 
      );
    }
    return view;
  }
}

export default Location;
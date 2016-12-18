import React from 'react';
import $ from 'jquery';

// Needed props: isPlanner
class Attendees extends React.Component {
  constructor(props) {
    super(props);
    this.currentProps = this.props.propsToAttendees;

    this.state = {
      attendees: []
    };

    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
  }

  // On component did mount, get list of all attendees with ajax get request
  componentDidMount() {
    var successHandler = function(data) {
      // need to turn the attendees from the data into an array of names
      // console log data here after writing the route
      var attendeeArray = [];
      var attendees = JSON.parse(data);
      attendees.forEach( (attendee) => {
        attendeeArray.push(attendee.accountName);
      });
      this.setState({
        attendees: attendeeArray
      });
    };

    $.ajax({
      method: 'GET',
      url: '/attendee',
      data: {
        eventName: this.currentProps.eventName
      },
      success: successHandler.bind(this)
    });
  }

  handleClickAdd() {
    var userToAdd = prompt('Enter the name of the person you want to add to this event:');
    var newArray = this.state.attendees;
    newArray.push(userToAdd);

    this.setState({
      attendees: newArray
    });

    // POST request to the server to update attendee list
    $.ajax({
      method: 'POST',
      url: '/attendingEvents',
      contentType: 'application/json',
      data: JSON.stringify({
        accountName: userToAdd,
        eventName: this.currentProps.eventName
      })
    });

  }

  handleClickRemove(e) {
    var name = e.target.className;
    // 'this' is the string of the name that is next to the button when the button is pressed
    var newArray = this.state.attendees;
    newArray.splice(newArray.indexOf(name), 1);

    this.setState({
      attendees: newArray
    });

    // Do an AJAX delete request to the server to remove an attendee
    $.ajax({
      method: 'DELETE',
      url: '/attendingEvents',
      data: JSON.stringify({
        accountName: name,
        eventName: this.currentProps.eventName
      })
    });

  }

  render() {
    var view;

    // If the user is a planner, allow removal and addition of attendees
    if (this.currentProps.isPlanner) {
      view = (
        <div className="attendees-box">
          <h3>Who's Attending <img onClick={this.handleClickAdd} src="http://www.verdemartin.com/wp-content/uploads/2015/06/plus-button-green.png" style={{width: '35px'}} /></h3>
          <div>
            {this.state.attendees.map( (attendee) => (<div>{attendee} <img src="http://www.clker.com/cliparts/f/5/f/0/1349803480867294890Close%20Button.svg.med.png" 
              onClick={this.handleClickRemove.bind(attendee)} className={attendee} style={{width: '15px'}} /></div>) ) }
          </div>
        </div>
      );
    } else {
      view = (
        <div className="attendees-box">
          <h3>Who's Attending</h3>
          <div>
            {this.state.attendees.map( (attendee) => (<div>{attendee}</div>) ) }
          </div>
        </div>
      );
    }

    return view;
  }
}

export default Attendees;
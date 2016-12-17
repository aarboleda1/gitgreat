//Parent App within createEvent.html
//Allows users to create new events
import React from 'react';
// import Nav from './nav.jsx';
import $ from 'jquery';


class CreateEventApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      where: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleLocChange = this.handleLocChange.bind(this);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }
  handleDescriptionChange(event) {
    this.setState({description: event.target.value});
  }
  handleLocChange(event) {
    this.setState({where: event.target.value});
  }

  handleEventSubmit(event) {
    //sends a post request with the event data to the server, which will enter the event into
    //the eventTable
    var successHandler = function() {
      this.props.updateEvents();
      this.props.changePage('events');
    }.bind(this);

    // BELOW AJAX CALLS NEED TO BE PROMISIFED

    // post event to event table
    $.ajax({
      method: 'POST',
      url: '/event',
      contentType: 'application/json',
      data: JSON.stringify(this.state),
      success: function(data) {
        // post to eventattendees join table
        $.ajax({
          method: 'POST',
          url: '/attendingEvents',
          contentType: 'application/json',
          data: JSON.stringify({
                  eventName: this.state.name,
                  accountName: this.props.accountName
                }),
          success: function(data) {
            // post to eventplanners join table
            $.ajax({
              method: 'POST',
              url: '/planningEvents',
              contentType: 'application/json',
              data: JSON.stringify({
                      eventName: this.state.name,
                      accountName: this.props.accountName
                    }),
              success: function(data) {
                successHandler();
              }.bind(this)
            });
          }.bind(this)
        });
      }.bind(this)
    });
    // post user as an attendee (join table insert)
    
    // post user as a planner (join table insert)
    
    event.preventDefault();
  } 
  render() {
    return (
      <div>
        <div className="featureBody" id="createEvent">
          <form onSubmit={this.handleEventSubmit}>
            <p><label>
              Event Name:  
              <input type="text" name="name" 
              value={this.state.name}
              onChange={this.handleNameChange}/>
            </label></p>
            <p><label>
              Description:
              <input type="text" name="description" 
              value={this.state.description}
              onChange={this.handleDescriptionChange}/>
            </label></p>
            <p><label>
              Location: 
              <input type="text" name="location" 
              value={this.state.where}
              onChange={this.handleLocChange}/>
            </label></p>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div id='msg'></div>
      </div>
    );
  }
}

export default CreateEventApp;
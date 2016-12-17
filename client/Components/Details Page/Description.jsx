import React from 'react';
import $ from 'jquery';

// Needed props: Event name, event description, isPlanner
class Description extends React.Component {
  constructor(props) {
    super(props);
    this.currentProps = this.props.propsToDescription;

    this.state = {
      eventName: this.currentProps.eventName,
      eventDescription: this.currentProps.eventDescription
    };

    this.handleNameEdit = this.handleNameEdit.bind(this);
    this.handleDescriptionEdit = this.handleDescriptionEdit.bind(this);
  }


  handleNameEdit() {
    // Put request to the server to update the name of the event
    var newEventName = prompt('What do you want to change the event name to?');

    this.setState({
      eventName: newEventName
    });

    var putData = {
      original: this.currentProps.eventName,
      new: newEventName
    };

    $.ajax({
      method: 'PUT',
      url: '/editeventname',
      data: putData
    });
  }

  handleDescriptionEdit() {
    // Put request to the server to update the description of the event
    var newEventDescription = prompt('New description:');

    this.setState({
      eventDescription: newEventDescription
    });

    var putData = {
      original: this.currentProps.eventName,
      new: newEventDescription
    };

    $.ajax({
      method: 'PUT',
      url: '/editeventdescription',
      data: putData
    });
  }

  render() {
    var view;

    if (this.currentProps.isPlanner) {
      view = (
        <div className="description-box">
          <h2>{this.state.eventName} <img onClick={this.handleNameEdit} style={{'width': '45px'}} src="http://www.iconsfind.com/wp-content/uploads/2013/11/Editing-Edit-icon.png" /></h2>
          <div >
            {this.state.eventDescription} <img onClick={this.handleDescriptionEdit} style={{'width': '15px'}} src="http://www.iconsfind.com/wp-content/uploads/2013/11/Editing-Edit-icon.png" />
          </div>
        </div>
      );
    } else {
      view = (
        <div className="description-box">
          <h2>{this.state.eventName}</h2>
          <div >
            {this.state.eventDescription}
          </div>
        </div>
      );
    }

    return view;
  }
}

export default Description;
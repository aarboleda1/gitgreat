import React from 'react';
import Description from './Description.jsx';
import Location from './Location.jsx';
import Forum from './Forum.jsx';
import Attendees from './Attendees.jsx';

class Details extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var currentProps = this.props.propsToDetails;

    var propsToDescription = {
      eventName: currentProps.eventName,
      eventDescription: currentProps.eventDescription,
      isPlanner: currentProps.isPlanner
    };

    var propsToLocation = {
      eventLocation: currentProps.eventLocation,
      isPlanner: currentProps.isPlanner
    };

    var propsToForum = {
      eventName: currentProps.eventName,
      username: currentProps.username
    };

    var propsToAttendees = {
      isPlanner: currentProps.isPlanner
    };

    return (
      <div className="container" style={{'marginLeft': '300px'}}>

        <div className="row">
          <div className="details-description col s6">
            <Description propsToDescription={propsToDescription} />
          </div>

          <div className="details-location col s6">
            <Location propsToLocation={propsToLocation} />
          </div>
        </div>

        <div className="row">
          <div className="details-forum col s6">
            <Forum propsToForum={propsToForum} />
          </div>

          <div className="details-attendees col s6">
            <Attendees propsToAttendees={propsToAttendees} />
          </div>
        </div>

      </div>
    );
  }
}

export default Details;
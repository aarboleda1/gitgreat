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
      eventAddress: currentProps.eventAddress,
      isPlanner: currentProps.isPlanner
    };

    var propsToForum = {
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

window.Details = Details;
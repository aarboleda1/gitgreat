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
      this.setState({
        attendees: data
      });
    };

    $.ajax({
      method: 'GET',
      url: '/getattendees',
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

    // PUT request to the server to update attendee list
    $.ajax({
      method: 'POST',
      url: 'updateattendee',
      data: newArray
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

    // Do an AJAX put request to the server to update attendee array
    $.ajax({
      method: 'PUT',
      url: 'updateattendee',
      data: newArray
    });
  }

  render() {
    var view;

    // If the user is a planner, allow removal and addition of attendees
    if (this.currentProps.isPlanner) {
      view = (
        <div className="attendees-box">
          <h3>Who's Attending <img onClick={this.handleClickAdd} src="../assets/green.png" style={{width: '35px'}} /></h3>
          <div>
            {this.state.attendees.map( (attendee) => (<div>{attendee} <img src="../assets/red.png" 
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

window.Attendees = Attendees;
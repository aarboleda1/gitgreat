// Needed props: Username
class Forum extends React.Component {
  constructor(props) {
    super(props);
    this.currentProps = this.props.propsToForum;

    this.state = {
      value: '',
      messages: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // AJAX get request to the database to fetch the messages and update state with it
  componentDidMount() {
    var successHandler = function(data) {
      this.setState({
        messages: data
      });
    };

    $.ajax({
      method: 'GET',
      url: '/getforummessages',
      success: successHandler.bind(this)
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    var newMessageArray = this.state.messages;
    var newMessage = {
      username: this.currentProps.username,
      message: this.state.value
    };
    newMessageArray.unshift(newMessage);

    this.setState({
      value: '',
      messages: newMessageArray
    });

    // Send a put request to the server to update messages database
    $.ajax({
      method: 'PUT',
      url: '/updatemessages',
      data: newMessageArray
    });


    event.preventDefault();
  }

  render() {
    return (
      <div className="forum-box">
        <h3>Forum</h3>
        <div className="send-box">
          <form onSubmit={this.handleSubmit}>
            <textarea id="message-text" style={{width: '400px'}}type="text" value={this.state.value} onChange={this.handleChange} />
            <br />
            <input type="submit" value="Send" />
          </form>
        </div>

        <div>
          {this.state.messages.map( (element) => (
            <div className="message-box" style={{'backgroundColor': 'white', 'paddingLeft': '5px', margin: '5px', 'width': '400px', 'borderRadius': '5px'}}>
              <h5>{element.username}</h5>
              <h6>{element.message}</h6>
            </div>
          ))}
        </div>

      </div>
    );
  }
}

window.Forum = Forum;
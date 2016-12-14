// Needed props: Username
class Forum extends React.component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      messages: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // AJAX get request to the database to fetch the messages and update state with it
  // Probably should be in component did mount
  fetchMessages() {

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="forum-box">

        <div className="send-box">
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            <input type="submit" value="Send" />
          </form>
        </div>

        <div className="message-box">

        </div>

      </div>
    );
  }
}

window.Forum = Forum;
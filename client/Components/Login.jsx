import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };

    this.userInput = this.userInput.bind(this);
  }

  checkUserExists(e) {
    // query database to look for user
    // if user doesn't exist, post user to users
  }

  userSignup(username) {

  }

  userInput(e) {
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <div className="loginPage">
        <input className="form-control" type="text"
               value={this.state.username} 
               onChange={this.userInput}/>
        <button className="btn hidden-sm-down"
                onClick={() => (this.props.handleLogin(this.state.username))}>
          Submit
        </button>
      </div>
    )
  }
}

export default Login;
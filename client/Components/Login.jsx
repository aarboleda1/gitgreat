import React from 'react';
import $ from 'jquery';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountName: '',
      showLogin: false
    };
    this.userInput = this.userInput.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  checkUserExists(accountName) {
    // query database to look for user
    $.ajax({
      method: 'GET',
      url: '/user?accountName=' + this.state.accountName,
      success: function(data) {
        var parsed = JSON.parse(data);
        if (parsed.notFound){
          // user was not found in database, post them to db
          $.ajax({
            method: 'POST',
            url: '/user',
            contentType: 'application/json',
            data: JSON.stringify({accountName: this.state.accountName}),
            success: function(success) {
              this.props.handleLogin(accountName);
            }.bind(this)
          })
        } else {
          // user was found, login using the accountName
          this.props.handleLogin(accountName);
        }
      }.bind(this)
    })
  }

  userSignup(accountName) {
    $.ajax({
      method: 'POST',
      url: '/user',
      contentType: 'application/json',
      data: JSON.stringify(this.state.accountName),
      success: successHandler.bind(this)
    });
  }

  userInput(e) {
    this.setState({ accountName: e.target.value });
  }

  // onClick={() => (this.checkUserExists(this.state.accountName))}>
  // 
  render() {
    return (
      <div className="loginPage">
        <h1>Login</h1>
        <input className="form-control" type="text" placeholder="Account Name"
               value={this.state.accountName} 
               onChange={this.userInput}/>
        <button className="btn hidden-sm-down"
                onClick={() => (this.checkUserExists(this.state.accountName))}>
          Submit
        </button>
      </div>
    )
  }
}

export default Login;
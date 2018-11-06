import React from 'react';
import axios from 'axios';
import { Component } from 'react';

const BASE_URL = 'localhost:8080';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'username': '',
      'password': '',
      'error': false,
      'message': ''
    };
  }

  _handleInputChange (e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    })
  }

  _saveSession (data) {
    localStorage.setItem('user', { '_id': data.user._id, 'username': data.user.username });
    localStorage.setItem('token', data.token);
  }

  _setError (message) {
    this.setState({
      error: true,
      message
    })
  }

  _clearError () {
    this.setState({
      error: false,
      message: ''
    })
  }

  async _submitCredentials (e) {
    e.preventDefault();
    if ( this.state.username && this.state.password ) {
      const { username, password } = this.state;
      const response = await axios.post(`${BASE_URL}/api/auth/login`, { username, password });
      if ( response.success ) {
        this._saveSession(response);
        this.props.history.push('/dashboard');
      } else {
        this._setError(response.message);
      }
    }
  }

  render(){
    return(
      <div>
        <h1>Login</h1>
        <form>
          <input
            name="username"
            type="text"
            placeholder={"USERNAME"}
            onChange={this._handleInputChange}
          />
          <input
            name="password"
            type="password"
            placeholder={"PASSWORD"}
            onChange={this._handleInputChange}
          />
          <button
            type="submit"
            onClick={(e) => this._submitCredentials(e)}
          >Submit</button>
        </form>
      </div>
    )
  }
}

export default Login;
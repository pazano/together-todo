import React from 'react';
import axios from 'axios';
import { Component } from 'react';

const BASE_URL = 'http://localhost:8080';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'username': '',
      'password': '',
      'error': false,
      'message': ''
    };
    this._handleInputChange = this._handleInputChange.bind(this);
    this._setError = this._setError.bind(this);
    this._clearError = this._clearError.bind(this);
    this._submitCredentials = this._submitCredentials.bind(this);
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
    localStorage.setItem('expiry', data.expiry);
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
    try {
      if ( this.state.username && this.state.password ) {
        const { username, password } = this.state;
        const { data } = await axios.post(`${BASE_URL}/api/auth/login`, { username, password });
        if ( data.success ) {
          this._saveSession(data);
          this.props.history.push('/dashboard');
        } else {
          this._setError(data.message);
        }
      }
    } catch(e) {
      console.log('error in credentials submission.')
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
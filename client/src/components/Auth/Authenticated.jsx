import React, { Component } from 'react';
import { push } from 'react-router-dom';
import auth from '../../utils/auth.js';

export default function (ComponentToAuthenticate) {
  class Authenticated extends Component {

    constructor(props) {
      super(props);
      this.state = {};
    }

    _loadSession() {
      const session = auth.retrieveSession();
      const now = new Date();
      const isAuthenticated = session.expiry && session.expiry > now.getTime() ? true : false;
      console.log(`There ${isAuthenticated ? 'is' : 'is not'} an active session`);
      this.setState({
        'user': session.user,
        'token': session.token,
        'expiry': session.expiry,
        isAuthenticated,
      })
    }

    _validateAndRoute() {
      if (!this.state.isAuthenticated) {
        push('/login');
      }
    }

    componentDidMount() {
      this._loadSession();
      this._validateAndRoute();
    }

    render() {
      return (
        <div>
          { this.state.isAuthenticated ? <ComponentToAuthenticate {...this.props} /> : null }
        </div>
      );
    }
  }
}

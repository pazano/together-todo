import React, { Component } from 'react';
import auth from '../../utils/auth.js';

class Authenticated extends Component {

  _checkSession() {
    const session = auth.retrieveSession();
    const now = new Date();
    console.log(session.expiry);
    console.log(now.getTime())
    const isValid = session.expiry && (session.expiry > now.getTime()) ? true : false;
    console.log(`session ${isValid ? 'is' : 'is not'} valid`)
    return isValid;
  }

  _validateSession() {
    if (!this._checkSession()) {
      localStorage.clear();
      this.props.history.push('/login');
    }
  }

  componentDidMount() {
    this._validateSession();
  }

  componentDidUpdate() {
    this._validateSession();
  }

  render() {
    const { component: Component } = this.props;
    return (
      <Component {...this.props} />
    )
  }
}

export default Authenticated;

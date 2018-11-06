import React, { Component } from 'react';
import auth from '../../utils/auth.js';

class Authenticated extends Component {

  _checkSession() {
    const session = auth.retrieveSession();
    const now = new Date();
    const isValid = session.expiry && session.expiry > now.getTime() ? true : false;
    console.log(`session ${isValid ? 'is' : 'is not'} valid`)
    return isValid;
  }

  _validateSession() {
    if (!this._checkSession()) {
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

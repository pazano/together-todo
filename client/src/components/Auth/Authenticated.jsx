import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../utils/auth.js';

const checkSession = () => {
  const session = auth.retrieveSession();
  const now = new Date();
  console.log(session.expiry);
  console.log(now.getTime())
  const isValid = session.expiry && (session.expiry > now.getTime()) ? true : false;
  console.log(`session ${isValid ? 'is' : 'is not'} valid`)
  return isValid;
}

const Authenticated = ( { component: Component } ) => {
  const session = checkSession();
  return(
    <Route
      render={ props =>
        session ?
          ( <Component {...props} /> )
          :
          ( <Redirect to={{ pathname: "/login", state: { from: props.location } }} /> )
      }
    />
  )
}

export default Authenticated;



//   _routeOnSession() {
//     console.log(this._checkSession())
//     if (!this._checkSession()) {
//       localStorage.clear();
//       <Redirect
//         to={{
//           pathname: '/login',
//           state: { from: this.props.location }
//         }} />
//     } else {
//       <Redirect
//         to={{
//           pathname: '/',
//           state: { from: this.props.location }
//         }} />
//     }
//   }

//   componentDidMount() {
//     this._routeOnSession();
//   }

//   componentDidUpdate() {
//     this._routeOnSession();
//   }

//   render() {
//     return (
//       <div>hello?</div>
//     )
//   }
// }

// export default Authenticated;

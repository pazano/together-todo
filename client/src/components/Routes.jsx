import React from 'react';
import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Auth/Login/index.jsx';
import App from './App/index.jsx';

import Authenticated from './Auth/Authenticated.jsx';


class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  render() {
    return(
      <div>
        <Switch>
          <Route
            path="/login/" component={Login} />
          <Authenticated
            name="home"
            exact path="/"
            component={App}
          />
        </Switch>
      </div>
    )
  }
}

export default Routes;
import React from 'react';
import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';


import Login from './Auth/Login/index.jsx';
import Dashboard from './Dashboard/index.jsx';

import Authenticated from './Auth/Authenticated.jsx';


class App extends Component {
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
          <Route
            name="home"
            exact path="/"
            component={props => <Authenticated component={Dashboard} {...props} />}
          />
        </Switch>
      </div>
    )
  }
}

export default App;
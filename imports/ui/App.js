import React, { Component } from 'react';
import  MainLayout  from './layouts/MainLayout';
import  JobsLayout  from './layouts/JobsLayout';
import { Route,Redirect,Switch } from 'react-router-dom';

export default class App extends Component {

  render() {
    return (
      <div className="topmainclass">
       <Switch>
             <Route exact path="/" component={MainLayout} />
             <Route exact path="/jobs" component={JobsLayout} />

             <Route component={NoMatch}/>
         </Switch>
      </div>
    );
  }
}
const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

export const UserRoute = ({ component: Component, identity, ...rest }) => (
    <Route {...rest} render={props => (
    (identity === 'admin' || identity === 'user') ? (
      <Component {...props}/>
    ) : (
      <Redirect to="/login" />
    )
  )}/>
);

export const AdminRoute = ({ component: Component, identity, ...rest }) => (
    <Route {...rest} render={props => (
     identity === 'admin' ? (
      <Component {...props}/>
    ) : (
      <Redirect to="/login" />
    )
  )}/>
);

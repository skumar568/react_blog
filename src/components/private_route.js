import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({component: Component, ...rest}) => {
    console.log('in privateRoute with ',rest);
    const {isAuthenticated} = rest;
  
    return (
      <Route {...rest} render={props => (
        isAuthenticated ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: {from: props.location}
          }}/>
        )
      )}
      />
    );
  };
  
  function mapStateToProps({ user }) {
    console.log('in privateRoute with ',user);
    return {
      isAuthenticated: user.isAuthenticated,
    };
  }
  
  export default connect(mapStateToProps)(PrivateRoute);
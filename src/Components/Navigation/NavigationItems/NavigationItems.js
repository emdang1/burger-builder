import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

import { connect } from 'react-redux';

const navigation = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/' exact>
      Burger Builder
    </NavigationItem>
    <NavigationItem link='/orders'>Orders</NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem link='/logout'>Logout</NavigationItem>
    ) : (
      <NavigationItem link='/auth'>Authenticate</NavigationItem>
    )}
  </ul>
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.userId != null,
});

export default connect(mapStateToProps)(navigation);

// "active" can be left like this - because its boolean value
// active={true} is the same thing

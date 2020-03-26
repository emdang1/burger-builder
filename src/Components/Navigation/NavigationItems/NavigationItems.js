import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigation = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/' active={true}>
      Burger Builder
    </NavigationItem>
    <NavigationItem link='/'>Checkout</NavigationItem>
  </ul>
);

export default navigation;

// "active" can be left like this - because its boolean value
// active={true} is the same thing

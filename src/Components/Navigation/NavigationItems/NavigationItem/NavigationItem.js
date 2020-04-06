import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const navigationItem = props => (
  <li className={classes.NavigationItem}>
    <NavLink
      to={props.link}
      exact={props.exact}
      activeClassName={classes.active}
    >
      {props.children}
    </NavLink>
  </li>
);
// exact needs to be here because of "to" is prefix
// so the first navigationItem link is "/", that means that everything
// which matches this prefix will be active
// every route starts with "/"
// therefore we have to use "exact here"
// we are checking if the navigation item has "exact" prop,
// if so we are using it in the official navlink prop "exact", to set it
// either true or false

// activeClassName prop in navLink is used when youre using css modules
// our classNames are generated so normal "active" className wont work
// so through this prop, we are stating what should be the name of the active indicating class
// instead of normal "active"

export default navigationItem;

// props.children can be here used in "a tag",
// because its wrapped in a "li tag"
// so the children belong to the li tag

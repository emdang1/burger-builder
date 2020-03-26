import React from 'react';
import classes from './NavigationItem.module.css';

const navigationItem = props => (
  <li className={classes.NavigationItem}>
    <a href={props.link} className={props.active ? classes.active : null}>
      {props.children}
    </a>
  </li>
);

export default navigationItem;

// props.children can be here used in "a tag",
// because its wrapped in a "li tag"
// so the children belong to the li tag

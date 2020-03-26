import React from 'react';
import burgerLogo from '../../assets/images/burger_logo.png';
import classes from './Logo.module.css';

const logo = props => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt='MyBurgerLogo' />
  </div>
);

// it is better to import the asset and then use it
// webpack will handle it (it will copy it and optimize it)
// so in the "burgerLogo" import we have a path to copied and optimized image
// normaly, the asset folder is not "shipped", i guess?

export default logo;

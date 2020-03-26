import React from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerIngredient.module.css';

const burgerIngredient = props => {
  // let variable which will hold the final JSX, which will be used in the end in return statement
  let ingredient = null;

  switch (props.type) {
    case 'bread-top':
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case 'salad':
      ingredient = <div className={classes.Salad}></div>;
      break;
    case 'meat':
      ingredient = <div className={classes.Meat}></div>;
      break;
    case 'cheese':
      ingredient = <div className={classes.Cheese}></div>;
      break;
    case 'bacon':
      ingredient = <div className={classes.Bacon}></div>;
      break;
    case 'bread-bottom':
      ingredient = <div className={classes.BreadBottom}></div>;
      break;
    default:
      ingredient = null;
  }
  return ingredient;
};

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default burgerIngredient;
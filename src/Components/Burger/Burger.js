import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {
  let ingredientSum = Object.values(props.ingredients).reduce(
    (sum, next) => sum + next,
    0
  );

  const transformedIngredients = Object.keys(props.ingredients).map((ingrKey) =>
    [...Array(props.ingredients[ingrKey])].map((el, i) => (
      <BurgerIngredient key={ingrKey + i} type={ingrKey} />
    ))
  );

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {ingredientSum > 0 ? transformedIngredients : <p>Add some ingredients</p>}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default burger;

import React from 'react';
import classes from './Order.module.css';

const order = props => {
  // default empty array for ingredients
  const ingredients = [];

  // looping through ingredients
  // pushing new object to ingredients array with name and amount props
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientOutput = ingredients.map(ingr => (
    <span
      key={ingr.name}
      // inline quick styling
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
      }}
    >
      {ingr.name} ({ingr.amount})
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

// toFixed only works on number, but fetched price is by default a string
// so thats why we need to Number.parseFloat()
// or we can add "+" before the value
// in the place where we are passing it to the order component (so orders component)
export default order;

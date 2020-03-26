import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

// constant holding all available ingredients
const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <h3>Current price: ${props.price.toFixed(2)}</h3>
      {controls.map(el => (
        <BuildControl
          key={el.label}
          label={el.label}
          added={() => props.ingredientAdded(el.type)}
          removed={() => props.ingredientRemoved(el.type)}
          isDisabled={props.disabled[el.type] === 0 ? true : false}
        />
      ))}
      <br />
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        Order now
      </button>
    </div>
  );
};

export default buildControls;

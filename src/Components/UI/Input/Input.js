import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;

  // default className array - used for appending invalid class
  const inputClasses = [classes.InputElement];

  if (props.touched && props.shouldValidate && props.valid === false) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case 'input':
      // spreading props onto the original element
      // so all we have to do is set the "inputType" and then use the default props
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;

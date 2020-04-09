import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;

  // inputtype - all must be lowercase, because we are spreading it on the original html element <input>
  // and original html elements doesnt support camelCasing

  switch (props.inputtype) {
    case 'input':
      // spreading props onto the original element
      // so all we have to do is set the "inputType" and then use the default props
      inputElement = <input className={classes.InputElement} {...props} />;
      break;

    case 'textarea':
      inputElement = <textarea className={classes.InputElement} {...props} />;
      break;

    default:
      inputElement = <input className={classes.InputElement} {...props} />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;

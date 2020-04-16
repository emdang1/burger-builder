import React, { Component } from 'react';
import classes from './Auth.module.css';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';

class Auth extends Component {
  state = {
    AuthForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
  };

  checkValidity = (inputValue, rules) => {
    let isValid = true;

    // if there's required prop defined for this input
    // set isValid to true - if trimmed inputValue is not equal to an empty string
    // && true value trick = every check needs to pass or "isValid" will be false from the first problem
    if (rules.required) {
      isValid = inputValue.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = inputValue.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = inputValue.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    // event is synthetic event -> treated like sync code
    // so we have to extract the value before and then use it in the setState
    // because this form of setState (with parameter) is async code
    // otherwise we would get an error

    let eventValue = event.target.value;

    this.setState((state) => ({
      ...state,
      AuthForm: {
        ...state.AuthForm,
        [inputIdentifier]: {
          ...state.AuthForm[inputIdentifier],
          value: eventValue,
          valid: this.checkValidity(
            eventValue,
            state.AuthForm[inputIdentifier].validation
          ),
          touched: true,
        },
      },
    }));

    // in this case, we are not checking if the whole form is valid and we are not
    // disabling the submit button
    // because we want to treated differently than normal form
    // wrong and missing credentials submit etc
  };

  render() {
    // passing newly created objects into array, so we can loop through
    let authFormElementsArray = [];
    for (let key in this.state.AuthForm) {
      authFormElementsArray.push({
        id: key,
        config: this.state.AuthForm[key],
      });
    }

    const form = authFormElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        touched={formElement.config.touched}
        valid={formElement.config.valid}
        shouldValidate={formElement.config.validation}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    return (
      <div className={classes.AuthForm}>
        <form>
          {form}
          <Button btnType='Success'>SUBMIT</Button>
        </form>
      </div>
    );
  }
}
export default Auth;
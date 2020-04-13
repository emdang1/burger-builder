import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';

import axios from '../../../axios-orders';
import { connect } from 'react-redux';

class ContactData extends Component {
  // order form config for dynamically outputing the custom input elements
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'E-mail',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        validation: {},
        value: 'fastest',
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  };

  orderHandler = (event) => {
    // prevents from default "sending request"
    event.preventDefault();

    let formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }

    // showing loading spinner
    this.setState({ loading: true });

    // officialy, price shouldnt be sent from frontend
    // it should be recalculated on the backend
    // we should just sent the needed data for the calculation
    // we created a dummy order object
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };

    // .json is needed because of firebase
    axios
      .post('/orders.json', order)
      .then((response) => {
        // hiding the loading spinner after getting the response
        // and closing the modal also  through purchasing state
        // purchasing state was removed ... this whole code for transfered
        // from burgerbuilder

        // the .history props comes from the spreading the props
        // in the render method in checkout component
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  // method to check if the input is valid or not
  // returns true / false
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
    // copying the whole state - but only one level deep
    const updatedOrderForm = {
      ...this.state.orderForm,
    };

    // copying the single element (name, country etc.)
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

    // accessing value property of that copied element and changing it to event.target.value
    updatedFormElement.value = event.target.value;

    // changing the "touched" prop
    updatedFormElement.touched = true;

    // ------------ input validity check - before updating the copied object and putting it in the state
    // after verifying, we are setting the valid property to respective value
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    // putting the newly updated single element into copied form state to the right prop
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    // after all changes, we need to make sure our whole form is valid
    // aka go through every single element and its .valid prop
    // using the "&& trick"

    let formIsValid = true;
    for (let elementKey in updatedOrderForm) {
      formIsValid = updatedOrderForm[elementKey].valid && formIsValid;
    }

    // setting state by putting newly updatedOrderForm to the orderForm prop
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    // tranforming orderForm state object into separate element objects in array
    let orderFormArray = [];
    for (let key in this.state.orderForm) {
      orderFormArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let formOrSpinner = (
      <form onSubmit={this.orderHandler}>
        {orderFormArray.map((element) => (
          <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            changed={(event) => this.inputChangedHandler(event, element.id)}
            shouldValidate={element.config.validation}
            valid={element.config.valid}
            touched={element.config.touched}
          />
        ))}

        <Button btnType='Success' disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      formOrSpinner = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {formOrSpinner}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ings: state.ingredients,
  price: state.totalPrice,
});

export default connect(mapStateToProps)(ContactData);

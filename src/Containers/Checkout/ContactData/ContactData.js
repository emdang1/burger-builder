import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';

import axios from '../../../axios-orders';

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
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code',
        },
        value: '',
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'E-mail',
        },
        value: '',
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: '',
      },
    },
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
      ingredients: this.props.ingredients,
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

  inputChangedHandler = (event, inputIdentifier) => {
    // copying the whole state - but only one level deep
    const updatedOrderForm = {
      ...this.state.orderForm,
    };

    // copying the single element (name, country etc.)
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

    // accessing value property of that copied element and changing it to event.target.value
    updatedFormElement.value = event.target.value;

    // putting the newly updated single element into copied form state to the right prop
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    // setting state by putting newly updatedOrderForm to the orderForm prop
    this.setState({ orderForm: updatedOrderForm });
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
          />
        ))}

        <Button btnType='Success'>ORDER</Button>
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

export default ContactData;

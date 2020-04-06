import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../Components/UI/Spinner/Spinner';

import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = event => {
    // prevents from default "sending request"
    event.preventDefault();

    // showing loading spinner
    this.setState({ loading: true });

    // officialy, price shouldnt be sent from frontend
    // it should be recalculated on the backend
    // we should just sent the needed data for the calculation
    // we created a dummy order object
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'John Smith',
        address: {
          street: 'Ballers 12',
          zipCode: '12345',
          country: 'Kazachstan'
        },
        email: 'testytest@testytes.com'
      },
      deliveryMethod: 'fastest'
    };

    // .json is needed because of firebase
    axios
      .post('/orders.json', order)
      .then(response => {
        // hiding the loading spinner after getting the response
        // and closing the modal also  through purchasing state
        // purchasing state was removed ... this whole code for transfered
        // from burgerbuilder

        // the .history props comes from the spreading the props
        // in the render method in checkout component
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  render() {
    let formOrSpinner = (
      <form>
        <input
          className={classes.Input}
          type='text'
          name='name'
          placeholder='Your name'
        />
        <input
          className={classes.Input}
          type='email'
          name='email'
          placeholder='Your email'
        />
        <input
          className={classes.Input}
          type='text'
          name='street'
          placeholder='Street'
        />
        <input
          className={classes.Input}
          type='text'
          name='postal'
          placeholder='Postal Code'
        />
        <Button btnType='Success' clicked={this.orderHandler}>
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

export default ContactData;

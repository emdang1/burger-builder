import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  };

  // the config in componentDidMount will not be set again
  // eventhough we are loading a new component through the route
  // therefore the url is changed
  // and the query parameters are gone
  // the parameters were extracted and pushed to localState

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    this.setState({ ingredients: ingredients });
  }

  checkoutCancelledHandler = () => {
    // since checkout component is hooked to react router through route
    // we have this special props like history and goBack function
    // which simply goes back
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    // here we are "replacing" the url with checkout/contact-data
    // we are using it for loading the contactData component
    // as you can see in the return part

    // in checkout Component we have "CheckoutSummary" and "ContactData" component
    // which is only rendered if the path is reached
    // that is made by this "checkoutContinuedHandler" method
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
}

// route here is nested route
// and its used for loading another component
// the component will be loaded only when the given path will be reached
// which will be caused by the click on the button in checkoutSummary

export default Checkout;

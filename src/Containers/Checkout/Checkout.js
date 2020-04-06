import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };

  // the config in componentDidMount will not be set again
  // eventhough we are loading a new component through the route
  // therefore the url is changed
  // and the query parameters are gone
  // the parameters were extracted and pushed to localState

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      //['salad', '1']
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({
      ingredients: ingredients,
      totalPrice: price
    });
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
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}
// in the Route we are not using the "component" keyword
// because we want to pass the "ingredients" state
// therefore we have to use the "render" keyword
// which is function that returns some JSX

// since we are using the "render" keyword
// by default ContactData will not have the special props like history, match etc.
// so we have two choices
// we can wrap up the ContactData component with hoc "withRouter" in the export
// or we can pass the props through that function in render and spread it onto the
// ContactData component

// route here is nested route
// and its used for loading another component
// the component will be loaded only when the given path will be reached
// which will be caused by the click on the button in checkoutSummary

export default Checkout;

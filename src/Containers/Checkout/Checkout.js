import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
  // the config in componentDidMount will not be set again
  // eventhough we are loading a new component through the route
  // therefore the url is changed
  // and the query parameters are gone
  // the parameters were extracted and pushed to localState

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
    let summary = <Redirect to='/' />;
    if (this.props.ings) {
      let redirect = this.props.purchased ? <Redirect to='/' /> : null;
      summary = (
        <div>
          {redirect}
          <CheckoutSummary
            ingredients={this.props.ings}
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
    return summary;
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

const mapStateToProps = (state) => ({
  ings: state.burgerBuilder.ingredients,
  purchased: state.order.purchased,
});

export default connect(mapStateToProps)(Checkout);

import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  // this component was changed from functional to class
  // after that we can use componentDidUpdate lifecycle hook

  // since OrderSummary is wrapped in Modal component
  // which is not visible always (shown / hidden)
  // through componentUpdate we can check if the orderSummary is updated

  // and eventhough the modal is hidden, order summary gets updated
  // so we need to fix it -> in modal component

  // after the fix in the modal component
  // there wont be any log of 'order summary update'
  // unless the modal is toggled to show/hide

  componentDidUpdate() {
    console.log('order summary update');
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (ingrKey) => (
        <li key={ingrKey + 1}>
          {ingrKey}: {this.props.ingredients[ingrKey]}
        </li>
      )
    );

    return (
      <div>
        <h3>Your order:</h3>
        <p>A delicious burger with the following ingredients: </p>
        <ul>{ingredientSummary}</ul>
        <h4>Total price: ${this.props.totalPrice.toFixed(2)}</h4>
        <p>Continue to checkout?</p>
        <Button btnType='Danger' clicked={this.props.purchaseCanceled}>
          CANCEL
        </Button>
        <Button btnType='Success' clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </div>
    );
  }
}

export default OrderSummary;

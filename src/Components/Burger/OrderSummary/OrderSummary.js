import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
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

import React, { Fragment } from 'react';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    },
    purchasable: false,
    purchasing: false,
    totalPrice: 0
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  updatePurchaseState = () => {
    let ingredients = { ...this.state.ingredients };
    console.log('ingredients after update', ingredients);
    let sum = Object.values(ingredients).reduce((sum, next) => sum + next, 0);
    console.log('sum', sum);
    this.setState({ purchasable: sum > 0 });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert('You continue!');

    // officialy, price shouldnt be sent from frontend
    // it should be recalculated on the backend
    // we should just sent the needed data for the calculation
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
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
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    this.setState(
      prevState => ({
        ingredients: { ...prevState.ingredients, [type]: newCount },
        totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]
      }),
      this.updatePurchaseState
    );
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount > 0) {
      const newCount = oldCount - 1;
      this.setState(
        prevState => ({
          ingredients: { ...prevState.ingredients, [type]: newCount },
          totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type]
        }),
        this.updatePurchaseState
      );
    }
  };

  render() {
    let disabledInfo = {
      ...this.state.ingredients
    };

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            totalPrice={this.state.totalPrice.toFixed(2)}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;

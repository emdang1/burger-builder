import React, { Fragment } from 'react';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';
import burger from '../../Components/Burger/Burger';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends React.Component {
  state = {
    ingredients: null,
    purchasable: false,
    purchasing: false,
    totalPrice: 0,
    loading: false,
    error: false
  };

  // due to this fetching data change,
  // the "ingredients" state is set to null
  // after fetching the data we are setting the data object as ingredients state

  // there are also other changes below, due to this change
  // also we are catching the error, if theres problem to connecting to backend for example
  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

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

    // showing loading spinner
    this.setState({ loading: true });

    // officialy, price shouldnt be sent from frontend
    // it should be recalculated on the backend
    // we should just sent the needed data for the calculation
    // we created a dummy order object
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
      .then(response => {
        // hiding the loading spinner after getting the response
        // and closing the modal also through purchasing state
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
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

    // these variables are related to the fetching data change
    // by default we have burgerOrSpinner as a spinner component
    // or error paragraph
    // and we are checking if the ingredients are "truthy" aka not null
    // if so, the burgerOrspinner component is override to burger + burgercontrols
    // and also we are overriding the orderSumOrSpinner component (since is dependent od the ingredients state)
    // which is by default null
    // it is then real orderSummary component
    let orderSumOrSpinner = null;
    let burgerOrSpinner = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burgerOrSpinner = (
        <Fragment>
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

      orderSumOrSpinner = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          totalPrice={this.state.totalPrice.toFixed(2)}
        />
      );
    }

    if (this.state.loading) {
      orderSumOrSpinner = <Spinner />;
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSumOrSpinner}
        </Modal>
        {burgerOrSpinner}
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);

import React, { Fragment } from 'react';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends React.Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  // due to this fetching data change,
  // the "ingredients" state is set to null
  // after fetching the data we are setting the data object as ingredients state

  // there are also other changes below, due to this change
  // also we are catching the error, if theres problem to connecting to backend for example
  componentDidMount() {
    // axios
    //   .get('/ingredients.json')
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({ error: true });
    //   });
    // temporarily commented out, because of the redux setup
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  updatePurchaseState = (ingredients) => {
    let sum = Object.values(ingredients).reduce((sum, next) => sum + next, 0);
    return sum > 0;
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const newCount = oldCount + 1;
  //   this.setState(
  //     (prevState) => ({
  //       ingredients: { ...prevState.ingredients, [type]: newCount },
  //       totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type],
  //     }),
  //     this.updatePurchaseState
  //   );
  // };

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount > 0) {
  //     const newCount = oldCount - 1;
  //     this.setState(
  //       (prevState) => ({
  //         ingredients: { ...prevState.ingredients, [type]: newCount },
  //         totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type],
  //       }),
  //       this.updatePurchaseState
  //     );
  //   }
  // };

  render() {
    let disabledInfo = {
      ...this.props.ings,
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

    if (this.props.ings) {
      burgerOrSpinner = (
        <Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Fragment>
      );

      orderSumOrSpinner = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          totalPrice={this.props.price.toFixed(2)}
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

const mapStateToProps = (state) => ({
  ings: state.ingredients,
  price: state.totalPrice,
});

const mapDispatchToProps = (dispatch) => ({
  onIngredientAdded: (ingName) =>
    dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
  onIngredientRemoved: (ingName) =>
    dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));

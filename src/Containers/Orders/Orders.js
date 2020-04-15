import React, { Component } from 'react';
import Order from '../../Components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import { fetchOrders } from '../../store/actions/order';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    const orders = [...this.props.orders];
    const finalOrders = orders.map((order) => (
      <Order
        key={order.id}
        // ingredients is an object
        ingredients={order.ingredients}
        price={order.price}
      />
    ));

    let spinnerOrOrders = this.props.loading ? <Spinner /> : finalOrders;

    return <div>{spinnerOrOrders}</div>;
  }
}

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: () => dispatch(fetchOrders()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));

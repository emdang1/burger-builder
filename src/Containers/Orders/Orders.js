import React, { Component } from 'react';
import Order from '../../Components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  // fetching data only when component is mounted
  // there is no other option
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axios
      .get('/orders.json')
      .then(res => {
        // new const for holding the fetched orders
        const fetchedOrders = [];
        // for in looping because res.data is an object of orders
        // in the prepared array I am pushing "inside values" of every
        // key in that object
        // so first key "MFDdsao53jdZ" will give us customer, delivery method, ingredients, price etc
        // so in the end i will have array of objects of this structure

        // to not lose ID - we will be pushing a new anonymous object
        // which we will spread the values in and in addition we are appending the ID (key)
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch(error => this.setState({ loading: false }));
  }
  render() {
    const orders = [...this.state.orders];
    const finalOrders = orders.map(order => (
      <Order
        key={order.id}
        // ingredients is an object
        ingredients={order.ingredients}
        price={order.price}
      />
    ));

    return <div>{finalOrders}</div>;
  }
}

export default withErrorHandler(Orders, axios);

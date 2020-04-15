import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData: orderData,
});

export const purchaseBurgerFail = (error) => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error: error,
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    // first dispatch - setting loading to true
    dispatch(purchaseBurgerStart());

    // async code - next dispatches success / fail
    axios
      .post('/orders.json', orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});

export const fetchOrdersSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders: orders,
});

export const fetchOrdersFail = (error) => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error: error,
});

// starting action for setting up the loading to true
export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());

    axios
      .get('/orders.json')
      .then((res) => {
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
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((error) => dispatch(fetchOrdersFail(error)));
  };
};

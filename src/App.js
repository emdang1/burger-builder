import React from 'react';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Orders from './Containers/Orders/Orders';
import './App.css';
import Checkout from './Containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/' exact component={BurgerBuilder} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={Orders} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;

import React from 'react';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Orders from './Containers/Orders/Orders';
import './App.css';
import Checkout from './Containers/Checkout/Checkout';
import { Route, Switch, withRouter } from 'react-router-dom';
import Auth from './Containers/Auth/Auth';
import Logout from './Containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import { tryAuthCheck } from './store/actions/auth';

class App extends React.Component {
  componentDidMount() {
    debugger;
    this.props.onTryAuthCheck();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={Orders} />
            <Route path='/auth' component={Auth} />
            <Route path='/logout' component={Logout} />
            <Route path='/' exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onTryAuthCheck: () => dispatch(tryAuthCheck()),
});

export default withRouter(connect(null, mapDispatchToProps)(App));

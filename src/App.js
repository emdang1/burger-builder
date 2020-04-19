import React from 'react';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Orders from './Containers/Orders/Orders';
import './App.css';
import Checkout from './Containers/Checkout/Checkout';
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from './Containers/Auth/Auth';
import Logout from './Containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import { tryAuthCheck } from './store/actions/auth';

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAuthCheck();
  }

  render() {
    // unauthenticated routes
    // redirect for "unknown" or every other routes
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );

    debugger;
    // authenticated routes
    // redirect for "unknown" or every other routes
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/auth' component={Auth} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

// isAuthenticated for conditional rendering of routes
// aka creating guards
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.userId != null,
});

const mapDispatchToProps = (dispatch) => ({
  onTryAuthCheck: () => dispatch(tryAuthCheck()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

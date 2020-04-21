import React, { Suspense } from 'react';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Orders from './Containers/Orders/Orders';
import './App.css';
import Checkout from './Containers/Checkout/Checkout';
import { Route, Switch, Redirect } from 'react-router-dom';
import Logout from './Containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import { tryAuthCheck } from './store/actions/auth';

// this import is not needed anymore due to react.lazy dynamic import (works only with default exports for now)
// import Auth from './Containers/Auth/Auth';
const Auth = React.lazy(() => import('./Containers/Auth/Auth'));

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAuthCheck();
  }

  render() {
    // unauthenticated routes
    // redirect for "unknown" or every other routes

    // using suspense to define the lazily loading component
    // thats the previously setup variable with react.lazy
    // suspense needs fallback, something like loading, meanwhile it loads
    // since we are using "render" and not "component" we have to pass props and spread them onto the component
    let routes = (
      <Switch>
        <Route
          path='/auth'
          render={(props) => (
            <Suspense fallback={<div>Loading... </div>}>
              <Auth {...props} />
            </Suspense>
          )}
        />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );

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

import React, { Suspense } from 'react';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { tryAuthCheck } from './store/actions/auth';
import Spinner from './Components/UI/Spinner/Spinner';

// these imports arent needed anymore due to react.lazy dynamic imports (works only with default exports for now)

// import Orders from './Containers/Orders/Orders';
// import Checkout from './Containers/Checkout/Checkout';
// import Auth from './Containers/Auth/Auth';
// import Logout from './Containers/Auth/Logout/Logout';

const Auth = React.lazy(() => import('./Containers/Auth/Auth'));
const Checkout = React.lazy(() => import('./Containers/Checkout/Checkout'));
const Logout = React.lazy(() => import('./Containers/Auth/Logout/Logout'));
const Orders = React.lazy(() => import('./Containers/Orders/Orders'));

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAuthCheck();
  }

  render() {
    // unauthenticated routes
    // redirect for "unknown" or every other routes

    // L A Z Y   L O A D I N G
    // using suspense to define the lazily loaded component
    // thats the previously set variable with react.lazy
    // suspense needs fallback, something like loading, meanwhile it loads
    // since we are using "render" and not "component" we have to pass props and spread them onto the component

    // we can wrap the whole swith into suspense
    // then we can normally use component and no render with props spreading

    // you can also
    let routes = (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path='/auth' component={Auth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      </Suspense>
    );

    // authenticated routes
    // redirect for "unknown" or every other routes
    if (this.props.isAuthenticated) {
      routes = (
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path='/auth' component={Auth} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={Orders} />
            <Route path='/logout' component={Logout} />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/' />
          </Switch>
        </Suspense>
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

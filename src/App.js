import React, { Suspense } from 'react';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Spinner from './Components/UI/Spinner/Spinner';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { tryAuthCheck } from './store/actions/auth';
import './App.css';

const Auth = React.lazy(() => import('./Containers/Auth/Auth'));
const Checkout = React.lazy(() => import('./Containers/Checkout/Checkout'));
const Logout = React.lazy(() => import('./Containers/Auth/Logout/Logout'));
const Orders = React.lazy(() => import('./Containers/Orders/Orders'));

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAuthCheck();
  }

  render() {
    let routes = (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path='/auth' component={Auth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      </Suspense>
    );

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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.userId != null,
});

const mapDispatchToProps = (dispatch) => ({
  onTryAuthCheck: () => dispatch(tryAuthCheck()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

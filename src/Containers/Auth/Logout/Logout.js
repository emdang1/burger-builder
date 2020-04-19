import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { logout } from '../../../store/actions/auth';
import { connect } from 'react-redux';

class Logout extends Component {
  // dispatching the logout action right when the component gets mounted
  componentDidMount() {
    this.props.onLogout();
  }

  // then we are returning the "redirect" element from react-router-dom
  // so we will be redirected to "home" page
  render() {
    return <Redirect to='/' />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logout()),
});
export default connect(null, mapDispatchToProps)(Logout);

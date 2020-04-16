import * as actionTypes from './actionTypes';
import axios from 'axios';

// actionCreator for setting up the loading spinner
export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (authData) => ({
  type: actionTypes.AUTH_SUCCESS,
  authData: authData,
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error: error,
});

// signup parameter is to indicate if we want to signup or signin
export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    // dispatching "starting action"
    dispatch(authStart());

    // setting up the url endpoint based on the method
    let signupOrSigninUrl = isSignup
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXoN6L4EG_hs0-klPIEhqnbdF52X-BEpA'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXoN6L4EG_hs0-klPIEhqnbdF52X-BEpA';

    // setting up the "POST" object
    let authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    // async code
    // [API KEY] was changed to Key of my project
    axios
      .post(signupOrSigninUrl, authData)
      .then((response) => {
        // console.log(response.data);
        dispatch(authSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        debugger;
        dispatch(authFail(error));
      });
  };
};

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

export const logout = () => ({
  type: actionTypes.AUTH_LOGOUT,
});

// automatic logout when token expires - using the "expiresIn" prop from the response
// thunk async action creator - async because setTimeout
// *1000 because setTimeout takes the parameter as in miliseconds, we want it in seconds
export const checkAuthTimeout = (expiration) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expiration * 1000);
  };
};

// signup parameter is to indicate if we want to signup or signin
export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    // dispatching "starting action"
    dispatch(authStart());

    // setting up the url endpoint based on the method
    // [API KEY] was changed to Key of my project
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
    axios
      .post(signupOrSigninUrl, authData)
      .then((response) => {
        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        debugger;
        // to access real main object, you need to error.response.data.error (this is the main object with info)
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path: path,
});

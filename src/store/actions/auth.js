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

// since we are storing token and userId etc, we need to remove them when logging out
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExpirationDate');
  localStorage.removeItem('userId');

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

// automatic logout when token expires - using the "expiresIn" prop from the response
// thunk async action creator - async because setTimeout
// *1000 because setTimeout takes the parameter as in miliseconds, but expiration comes in seconds
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
        console.log(response);
        // when we get the response - we are storing token, expiration etc. it in the localStorage
        localStorage.setItem('token', response.data.idToken);

        // also storing the userId, since we need it in the "tryAuthCheck" actionCreator
        localStorage.setItem('userId', response.data.localId);

        // calculating the time when the token will be due
        // response.data.expiresIn is just time limit =  "3600" which means 1 hour in seconds of validity
        // getTime() will get us milliseconds from 1st January 1970 - but .expiresIn is in seconds
        // so we also need to change that in to milliseconds by *1000
        const tokenExpirationDate =
          new Date().getTime() + response.data.expiresIn * 1000;
        localStorage.setItem('tokenExpirationDate', tokenExpirationDate);

        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        // to access real main object, you need to error.response.data.error (this is the main object with info)
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path: path,
});

export const tryAuthCheck = () => {
  // not an async code, but still using "thunk" dispatch
  // to dispatch different actions depending if we have valid token or not

  return (dispatch) => {
    // getting the previously stored token
    const token = localStorage.getItem('token');

    // we have to check if we even have a token
    // if no, dispatch logout action
    // if yes, verify if the token is still valid or not

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = localStorage.getItem('tokenExpirationDate');
      if (expirationDate <= new Date().getTime()) {
        dispatch(logout());
      } else {
        // dummy object for authSuccess action creator
        const tokenAndUser = {
          idToken: token,
          localId: localStorage.getItem('userId'),
        };

        // we dispatch success action
        // but also we need to call / dispatch the "automatic logout" action creator
        // checkAuthTimeOut - but we must not forget to update the time ("real" remining time of validity)
        // so we want be logout after default "1 hour" but after the remaining time
        dispatch(authSuccess(tokenAndUser));
        dispatch(
          checkAuthTimeout(
            (localStorage.getItem('tokenExpirationDate') -
              new Date().getTime()) /
              1000
          )
        );
      }
    }
  };
};

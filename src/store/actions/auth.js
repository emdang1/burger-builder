import * as actionTypes from './actionTypes';
import axios from 'axios';

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

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExpirationDate');
  localStorage.removeItem('userId');

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expiration) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expiration * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());

    let signupOrSigninUrl = isSignup
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

    let authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    axios
      .post(signupOrSigninUrl, authData)
      .then((response) => {
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('userId', response.data.localId);

        const tokenExpirationDate =
          new Date().getTime() + response.data.expiresIn * 1000;

        localStorage.setItem('tokenExpirationDate', tokenExpirationDate);

        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path: path,
});

export const tryAuthCheck = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = localStorage.getItem('tokenExpirationDate');
      if (expirationDate <= new Date().getTime()) {
        dispatch(logout());
      } else {
        const tokenAndUser = {
          idToken: token,
          localId: localStorage.getItem('userId'),
        };

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

import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // error set to null for "resetting purposes, if it was changed previously"
    case actionTypes.AUTH_START: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case actionTypes.AUTH_SUCCESS: {
      return {
        ...state,
        token: action.authData.idToken,
        userId: action.authData.localId,
        error: null,
        loading: false,
      };
    }

    case actionTypes.AUTH_FAIL: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }

    default:
      return state;
  }
};

export default reducer;

import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initialState if invalid action', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });

  it('should store token, when auth sucess', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.AUTH_SUCCESS,
        authData: {
          idToken: 'some-token',
          localId: 'some-user-id',
        },
      })
    ).toEqual({
      token: 'some-token',
      userId: 'some-user-id',
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });
});

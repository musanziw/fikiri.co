import {createReducer, on} from '@ngrx/store';
import * as authActions from './auth.actions';
import {AuthStoreInterface} from '../types/auth-store.interface';

const initialState: AuthStoreInterface = {
  user: null,
  error: null,
};

export const authReducers = createReducer(
  initialState,
  on(authActions.authentication, (store) => {
    return {
      ...store,
      user: null
    }
  }),
  on(authActions.authenticationSuccess, (store, user) => {
    return {
      ...store,
      user,
    }
  }),
  on(authActions.authenticationFailure, (store, actions) => {
    return {
      ...store,
      error: actions.error,
    }
  }),
  on(authActions.authenticationLogout, (store, actions) => {
    return {
      ...store,
      user: null,
    }
  })
);

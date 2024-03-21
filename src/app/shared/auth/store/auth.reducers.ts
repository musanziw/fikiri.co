import { createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';
import { AuthStoreInterface } from '../types/auth-store.interface';

const initialState: AuthStoreInterface = {
  user: null,
};

export const authReducers = createReducer(
  initialState,
  on(authActions.authentication, (_, user) => ({
    user: null,
  })),
  on(authActions.authenticationSuccess, (_, user) => ({
    user,
  })),
  on(authActions.authenticationFailure, (_, user) => ({ user: null }))
);

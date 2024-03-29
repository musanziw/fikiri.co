import {createFeature, createReducer, on} from '@ngrx/store';
import {AuthStoreInterface} from '../types/auth-store.interface';
import {authActions} from "./auth.actions";

const initialState: AuthStoreInterface = {
  isLoading: false,
  user: null,
  error: null,
  validationErrors: []
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.authentication, (state) => ({...state})),
    on(authActions.login, (state) => ({...state, isLoading: true})),
    on(authActions.register, (state) => ({...state, isLoading: true, validationErrors: []})),
    on(authActions.deleteError, (state) => ({...state, error: null})),
    on(authActions.validationErrors, (state, actions) => ({
      ...state,
      error: null,
      isLoading: false,
      validationErrors: actions.validationErrors
    })),
    on(authActions.authenticateUser, (state, actions) => ({
      ...state,
      user: actions.user,
      error: null
    })),
    on(authActions.authenticationFailure, (state, actions) => ({
      ...state,
      user: null,
      isLoading: false,
      error: actions.error
    })),
    on(authActions.logout, (state) => ({...state, user: null})),
  ),
})

export const {reducer: authReducers, selectUser, selectAuthState} = authFeature

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
    // Verfiy if the user is authenticated
    on(authActions.authentication, (state) => ({...state})),

    // login the user
    on(authActions.login, (state) => ({...state, isLoading: true})),
    on(authActions.authenticateUser, (state, actions) => ({
      ...state,
      user: actions.user,
      error: null,
      isLoading: false
    })),
    on(authActions.authenticationFailure, (state, actions) => ({
      ...state,
      user: null,
      isLoading: false,
      error: actions.error
    })),

    // register the user
    on(authActions.register, (state) => ({...state, isLoading: true})),
    on(authActions.validationErrors, (state, actions) => ({
      ...state,
      error: null,
      isLoading: false,
      validationErrors: actions.validationErrors
    })),

    // reset password request
    on(authActions.resetPasswordRequest, (state) => ({...state, isLoading: true})),
    on(authActions.resetPasswordRequestSuccess, (state) => ({...state, isLoading: false})),
    on(authActions.resetPasswordRequestFailure, (state, actions) => ({
      ...state,
      isLoading: false,
      error: actions.error,
      validationErrors: []
    })),

    // reset the password
    on(authActions.resetPassword, (state) => ({...state, isLoading: true})),
    on(authActions.resetPasswordSuccess, (state) => ({...state, isLoading: false})),
    on(authActions.resetPasswordFailure, (state, actions) => ({
      ...state,
      isLoading: false,
      error: actions.error,
      validationErrors: []
    })),

    // delete the error message
    on(authActions.deleteError, (state) => ({...state, error: null, validationErrors: []})),

    // logout the user
    on(authActions.logout, (state) => ({...state, user: null})),
  ),
})

export const {reducer: authReducers, selectUser, selectAuthState} = authFeature

import {createFeature, createReducer, on} from '@ngrx/store';
import {AuthStoreInterface} from '../types/auth-store.interface';
import {authActions} from "./auth.actions";

const initialState: AuthStoreInterface = {
  isLoading: false,
  user: null,
  error: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.authenticatedUser, (state) => ({...state})),
    on(authActions.authenticateUser, (state, actions) => ({...state, user: actions.user, isLoading: false})),
    on(authActions.authenticationFailure, (state, actions) => ({
      ...state,
      user: null,
      isLoading: false,
      error: actions.error
    })),
    on(authActions.logout, (state) => ({...state, user: null})),
  ),
})

export const {name: authFeatureKey, reducer: authReducers, selectAuthState} = authFeature

import {createFeature, createReducer, on} from '@ngrx/store';
import {loginActions} from "./login.actions";
import {LoginStoreInterface} from "../types/login-store.interface";

const initialState: LoginStoreInterface = {
  isLoading: false,
  user: null,
  error: null,
};

const loginFeature = createFeature({
  name: 'login',
  reducer: createReducer(
    initialState,
    on(loginActions.authentication, (state) => ({...state, isLoading: true})),
    on(loginActions.authenticateUser, (state, actions) => ({...state, user: actions.user, isLoading: false})),
    on(loginActions.authenticationFailure, (state, actions) => ({
      ...state,
      user: null,
      isLoading: false,
      error: actions.error
    })),
  ),
})

export const {reducer: loginReducers, selectLoginState} = loginFeature

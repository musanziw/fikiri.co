import {createReducer, on} from "@ngrx/store";
import * as authActions from "./auth.actions";
import {AuthStoreInterface} from "../types/auth-store.interface";

const initialState: AuthStoreInterface = {
  isLoading: false,
  user: null,
  error: null
}

export const authReducers = createReducer(initialState,
  on(authActions.isAuthenticated, (state, user) => ({...state, user})),
  on(authActions.login, (state) => ({...state, isLoading: true})),
  on(authActions.loginSuccess, (state, user) => ({...state, isLoading: false, user})),
  on(authActions.loginFailure, (state) => ({...state, isLoading: false})),
)

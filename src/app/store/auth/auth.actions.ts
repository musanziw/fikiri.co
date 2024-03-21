import {createAction, props} from "@ngrx/store";
import {User} from "../../shared/types/models-interfaces";

export const isAuthenticated = createAction("[Auth] is logged in", props<User>())
export const login = createAction("[Auth] login")
export const loginSuccess = createAction("[Auth] login success", props<User>())
export const loginFailure = createAction("[Auth] login failure")

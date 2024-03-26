import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {User} from "../../shared/types/models-interfaces";
import {LoginPayloadInterface} from "../types/login-payload.interface";

export const loginActions = createActionGroup({
  source: 'auth',
  events: {
    authentication: props<{ payload: LoginPayloadInterface }>(),
    authenticateUser: props<{ user: User }>(),
    authenticationFailure: props<{ error: string }>(),
  }
})

import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {User} from "../../types/models-interfaces";
import {LoginPayloadInterface} from "../../../login/types/login-payload.interface";
import {RegisterInterface} from "../../../register/types/register.interface";
import {ApiValiationsErrorsInterface} from "../types/api-valiations-errors.interface";

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    authentication: emptyProps(),
    deleteError: emptyProps(),
    login: props<{ payload: LoginPayloadInterface }>(),
    register: props<{ payload: RegisterInterface }>(),
    validationErrors: props<{ validationErrors: ApiValiationsErrorsInterface[] }>(),
    authenticateUser: props<{ user: User | null }>(),
    authenticationFailure: props<{ error: string }>(),
    logout: emptyProps(),
  }
})

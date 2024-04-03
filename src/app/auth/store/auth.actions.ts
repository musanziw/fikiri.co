import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {User} from "../../shared/types/models-interfaces";
import {LoginInterface} from "../login/types/login.interface";
import {RegisterInterface} from "../register/types/register.interface";
import {ApiValiationsErrorsInterface} from "../types/api-valiations-errors.interface";
import {ResetPasswordRequestInterface} from "../reset-password-request/types/resetPasswordRequest.interface";
import {ResetPasswordInterface} from "../reset-password/types/resetPassword.interface";

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    // Verfiy if the user is authenticated
    authentication: emptyProps(),

    // Request a password reset
    resetPasswordRequest: props<{ payload: ResetPasswordRequestInterface }>(),
    resetPasswordRequestSuccess: emptyProps(),
    resetPasswordRequestFailure: props<{ error: string }>(),

    // Reset the password
    resetPassword: props<{ payload: ResetPasswordInterface }>(),
    resetPasswordSuccess: emptyProps(),
    resetPasswordFailure: props<{ error: string }>(),

    // Login the user
    login: props<{ payload: LoginInterface }>(),
    authenticateUser: props<{ user: User | null }>(),
    authenticationFailure: props<{ error: string }>(),

    // Register the user
    register: props<{ payload: RegisterInterface }>(),
    validationErrors: props<{ validationErrors: ApiValiationsErrorsInterface[] }>(),

    // delete the error messages
    deleteError: emptyProps(),

    // Logout the user
    logout: emptyProps(),
  }
})

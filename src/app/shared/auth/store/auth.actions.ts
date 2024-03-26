import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {User} from "../../types/models-interfaces";

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    authenticatedUser: emptyProps(),
    authenticateUser: props<{ user: User }>(),
    authenticationFailure: props<{ error: string }>(),
    logout: emptyProps(),
  }
})

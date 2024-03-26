import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {User} from '../../types/models-interfaces';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    isAuthenticated: emptyProps(),
    authenticate: props<{ user: User }>(),
    authenticationFailure: props<{ error: string }>(),
    logout: emptyProps(),
  }
})

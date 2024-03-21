import { createAction, props } from '@ngrx/store';
import { User } from '../../types/models-interfaces';

export const authentication = createAction('[Auth] authentication');

export const authenticationSuccess = createAction(
  '[Auth] authentication success',
  props<User>()
);

export const authenticationFailure = createAction(
  '[Auth] authentication failure'
);

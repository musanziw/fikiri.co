import { createAction, props } from '@ngrx/store';
import { Solution } from '../../../../shared/types/models-interfaces';

export const load = createAction('[Winning solutions] load');
export const loadSuccess = createAction(
  '[Winning solutions] load success',
  props<{ solutions: Solution[] }>()
);
export const loadFailure = createAction(
  '[Winning solutions] load failure',
  props<{ error: string }>()
);

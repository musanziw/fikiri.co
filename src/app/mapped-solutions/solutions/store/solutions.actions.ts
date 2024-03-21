import {createAction, props} from '@ngrx/store';
import {Solution} from '../../../shared/types/models-interfaces';

export const load = createAction('[Solutions] load');
export const loadMore = createAction('[Solutions] load more');
export const loadSuccess = createAction('[Solutions] load success', props<{ solutions: Solution[] }>());
export const loadFailure = createAction('[Solutions] load failure', props<{ error: string }>());

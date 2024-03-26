import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Solution} from '../../../shared/types/models-interfaces';


export const solutionsActions = createActionGroup({
  source: 'solutions',
  events: {
    load: emptyProps(),
    loadMore:  emptyProps(),
    loadSuccess: props<{ solutions: Solution[] }>(),
    loadFailure: props<{ error: string }>(),
  },
})

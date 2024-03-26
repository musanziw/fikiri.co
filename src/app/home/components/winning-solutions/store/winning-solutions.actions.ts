import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Solution} from '../../../../shared/types/models-interfaces';

export const winningSolutionsActions = createActionGroup({
  source: 'winningSolutions',
  events: {
    load: emptyProps(),
    loadSuccess: props<{ solutions: Solution[] }>(),
    loadFailure: props<{ error: string }>(),
  },
})

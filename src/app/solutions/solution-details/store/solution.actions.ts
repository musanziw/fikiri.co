import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Solution} from '../../../shared/types/models-interfaces';


export const solutionActions = createActionGroup({
  source: 'solution',
  events: {
    load: emptyProps(),
    loadSuccess: props<{ solution: Solution }>(),
    loadFailure: props<{ error: string }>(),
  },
})

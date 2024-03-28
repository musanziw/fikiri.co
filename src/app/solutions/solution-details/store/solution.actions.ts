import {createActionGroup, props} from '@ngrx/store';
import {Solution} from '../../../shared/types/models-interfaces';


export const solutionActions = createActionGroup({
  source: 'solution',
  events: {
    load: props<{ id: number }>(),
    loadSuccess: props<{ solution: Solution | null, prev: number | null, next: number | null }>(),
    loadFailure: props<{ error: string }>(),
  },
})

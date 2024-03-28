import {createActionGroup, props} from '@ngrx/store';
import {Solution} from '../../../shared/types/models-interfaces';
import {PrevAndNextInterface} from "../types/prev-and-next.interface";


export const solutionActions = createActionGroup({
  source: 'solution',
  events: {
    load: props<{ id: number }>(),
    loadPrevAndNext: props<{ prevAndNext: PrevAndNextInterface }>(),
    loadSuccess: props<{ solution: Solution }>(),
    loadFailure: props<{ error: string }>(),
  },
})

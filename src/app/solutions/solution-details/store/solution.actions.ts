import {createActionGroup, props} from '@ngrx/store';
import {SolutionResponseInterface} from "../types/solution-response.interface";


export const solutionActions = createActionGroup({
  source: 'solution',
  events: {
    load: props<{ id: number }>(),
    loadSuccess: props<SolutionResponseInterface>(),
    loadFailure: props<{ error: string }>(),
  },
})

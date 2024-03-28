import {createFeature, createReducer, on} from '@ngrx/store';
import {SolutionStoreInterface} from '../types/solution-store.interface';
import {solutionActions} from "./solution.actions";

const initialState: SolutionStoreInterface = {
  isLoading: false,
  solution: null,
  error: null,
  prevAndNext: null
};

const solutionFeature = createFeature({
  name: 'solution',
  reducer: createReducer(
    initialState,
    on(solutionActions.load, (state) => ({...state, isLoading: true})),
    on(solutionActions.loadPrevAndNext, (state, actions) => ({
      ...state,
      isLoading: false,
      prevAndNext: actions.prevAndNext
    })),
    on(solutionActions.loadSuccess, (state, actions) => ({...state, isLoading: false, solution: actions.solution})),
    on(solutionActions.loadFailure, (state, actions) => ({...state, isLoading: false, error: actions.error}))
  ),
})

export const {reducer: solutionReducers, selectPrevAndNext, selectSolutionState} = solutionFeature


import {createFeature, createReducer, on} from '@ngrx/store';
import {SolutionStoreInterface} from '../types/solution-store.interface';
import {solutionActions} from "./solution.actions";

const initialState: SolutionStoreInterface = {
  isLoading: false,
  solution: null,
  error: null,
};

const solutionFeature = createFeature({
  name: 'solution',
  reducer: createReducer(
    initialState,
    on(solutionActions.load, (state) => ({...state, isLoading: true})),
    on(solutionActions.loadSuccess, (state, actions) => ({...state, isLoading: false, solution: actions.solution,})),
    on(solutionActions.loadFailure, (state, actions) => ({...state, isLoading: false, error: actions.error,}))
  ),
})

export const {reducer: solutionReducers, selectSolutionState} = solutionFeature


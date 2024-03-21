import { createReducer, on } from '@ngrx/store';
import * as solutionsActions from './solutions.actions';
import { SolutionsStoreInterface } from '../types/solutions-store.interface';

const initialState: SolutionsStoreInterface = {
  cursor: 1,
  isLoading: false,
  solutions: [],
  error: null,
};

export const solutionsReducers = createReducer(
  initialState,
  on(solutionsActions.load, (state) => ({ ...state, isLoading: true })),
  on(solutionsActions.loadMore, (state) => ({
    ...state,
    isLoading: true,
    cursor: state.cursor + 1,
  })),
  on(solutionsActions.loadSuccess, (state, actions) => ({
    ...state,
    isLoading: false,
    solutions: actions.solutions,
  })),
  on(solutionsActions.loadFailure, (state, actions) => ({
    ...state,
    isLoading: false,
    error: actions.error,
  }))
);

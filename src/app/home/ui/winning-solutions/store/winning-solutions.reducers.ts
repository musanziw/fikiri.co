import { createReducer, on } from '@ngrx/store';
import { WinningSolutionsStoreInterface } from '../types/winning-solutions-store.interface';
import * as winningSolutionsActions from './winning-solutions.actions';

const initialState: WinningSolutionsStoreInterface = {
  isLoading: false,
  solutions: [],
  error: null,
};

export const winningSolutionsReducers = createReducer(
  initialState,
  on(winningSolutionsActions.load, (state) => ({ ...state, isLoading: true })),
  on(winningSolutionsActions.loadSuccess, (state, actions) => ({
    ...state,
    isLoading: false,
    solutions: actions.solutions,
  })),
  on(winningSolutionsActions.loadFailure, (state, actions) => ({
    ...state,
    isLoading: false,
    error: actions.error,
  }))
);

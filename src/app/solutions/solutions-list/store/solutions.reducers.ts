import {createFeature, createReducer, on} from '@ngrx/store';
import {SolutionsStoreInterface} from '../types/solutions-store.interface';
import {solutionsActions} from "./solutions.actions";

const initialState: SolutionsStoreInterface = {
  cursor: 0,
  isLoadingMore: false,
  isLoading: false,
  solutions: [],
  error: null,
};

const solutionsFeature = createFeature({
  name: 'solutions',
  reducer: createReducer(
    initialState,
    on(solutionsActions.load, (state) => ({...state, isLoading: true, cursor: state.cursor + 1})),
    on(solutionsActions.loadMore, (state) => ({...state, isLoadingMore: true, cursor: state.cursor + 1,})),
    on(solutionsActions.loadSuccess, (state, actions) => ({
      ...state,
      isLoading: false,
      isLoadingMore: false,
      solutions: actions.solutions,
    })),
    on(solutionsActions.loadFailure, (state, actions) => ({
      ...state,
      isLoading: false,
      isLoadingMore: false,
      error: actions.error,
    }))
  ),
})

export const { reducer: solutionsReducers, selectSolutionsState} = solutionsFeature

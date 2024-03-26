import {createFeature, createReducer, on} from '@ngrx/store';
import {WinningSolutionsStoreInterface} from '../types/winning-solutions-store.interface';
import {winningSolutionsActions} from "./winning-solutions.actions";

const initialState: WinningSolutionsStoreInterface = {
  isLoading: false,
  solutions: [],
  error: null,
};

const winningSolutionsFeature = createFeature({
  name: 'winningSolutions',
  reducer: createReducer(
    initialState,
    on(winningSolutionsActions.load, (state) => ({...state, isLoading: true})),
    on(winningSolutionsActions.loadSuccess, (state, actions) => ({
      ...state,
      isLoading: false,
      solutions: actions.solutions,
    })),
    on(winningSolutionsActions.loadFailure, (state, actions) => ({...state, isLoading: false, error: actions.error,}))
  ),
})

export const {reducer: winningSolutionsReducers, selectWinningSolutionsState} = winningSolutionsFeature

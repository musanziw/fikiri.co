import {createFeature, createReducer, on} from '@ngrx/store';
import {CallStoreInterface} from '../types/call-store.interface';
import {callActions} from './call.actions';

const initialState: CallStoreInterface = {
  isLoading: false,
  callResponse: null,
  error: null,
};

const solutionFeature = createFeature({
  name: 'call',
  reducer: createReducer(
    initialState,
    on(callActions.load, (state) => ({...state, isLoading: true})),
    on(callActions.loadSuccess, (state, actions) => ({
      ...state,
      isLoading: false,
      callResponse: actions,
    })),
    on(callActions.loadFailure, (state, actions) => ({
      ...state,
      isLoading: false,
      error: actions.error,
    }))
  ),
});

export const {reducer: callReducers, selectCallState} = solutionFeature;

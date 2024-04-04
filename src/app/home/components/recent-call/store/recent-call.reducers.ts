import {createFeature, createReducer, on} from '@ngrx/store';
import {RecentCallStoreInterface} from '../types/recent-call-store.interface';
import {recentCallActions} from './recent-call.actions';

const initialState: RecentCallStoreInterface = {
  isLoading: false,
  call: null,
  error: null,
};

const recentCallFeature = createFeature({
  name: 'recentCall',
  reducer: createReducer(
    initialState,
    on(recentCallActions.load, (state) => ({...state, isLoading: true})),
    on(recentCallActions.loadSuccess, (state, actions) => ({
      ...state,
      isLoading: false,
      call: actions.call,
    })),
    on(recentCallActions.loadFailure, (state, actions) => ({
      ...state,
      isLoading: false,
      error: actions.error,
    }))
  ),
});

export const {reducer: recentCallReducers, selectRecentCallState} = recentCallFeature;

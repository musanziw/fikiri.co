import {createSelector} from '@ngrx/store';
import {AppStoreInterface} from '../../types/app-store.interface';

export const selectFeature = (state: AppStoreInterface) => state.auth;

export const userSelector = createSelector(
  selectFeature,
  (state) => state.user
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);

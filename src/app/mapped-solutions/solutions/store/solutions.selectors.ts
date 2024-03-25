import { createSelector } from '@ngrx/store';
import { AppStoreInterface } from '../../../shared/types/app-store.interface';

export const selectFeature = (state: AppStoreInterface) => state.solutions;

export const cursorSelector = createSelector(
  selectFeature,
  (state) => state.cursor
);
export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);
export const solutionsSelector = createSelector(
  selectFeature,
  (state) => state.solutions
);
export const isLoadingMore = createSelector(
  selectFeature,
  (state) => state.isLoadingMore
);

import { createSelector } from '@ngrx/store';
import { AppStoreInterface } from '../../../../shared/types/app-store.interface';

export const selectFeature = (state: AppStoreInterface) =>
  state.winningSolutions;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);
export const solutionsSelector = createSelector(
  selectFeature,
  (state) => state.solutions
);
export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);

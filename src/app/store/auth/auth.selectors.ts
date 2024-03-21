import {AppStoreInterface} from "../../shared/types/app-store.interface";
import {createSelector} from "@ngrx/store";

export const selectFeature = (state: AppStoreInterface) => state.auth


export const isLoadingSelector = createSelector(selectFeature, (state) => state.isLoading)
export const userSelector = createSelector(selectFeature, (state) => state.user)
export const errorSelector = createSelector(selectFeature, (state) => state.error)

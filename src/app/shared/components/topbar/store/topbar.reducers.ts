import {createFeature, createReducer, on} from "@ngrx/store";
import {TopbarStoreInterface} from "../types/topbar-store.interface";
import {topbarActions} from "./topbar.actions";

const initialState: TopbarStoreInterface = {
  isMenuOpen: false,
}
const navBarFeature = createFeature({
  name: 'navbar',
  reducer: createReducer(
    initialState,
    on(topbarActions.toogleNavbar, (state) => ({...state, isMenuOpen: !state.isMenuOpen})),
  ),
})
export const {reducer: topbarReducer, selectNavbarState, selectIsMenuOpen} = navBarFeature;

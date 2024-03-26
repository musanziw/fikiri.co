import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {AppStoreInterface} from "../types/app-store.interface";
import {map, Observable, tap} from "rxjs";
import {AuthStoreInterface} from "./types/auth-store.interface";
import {selectAuthState} from "./store/auth.reducers";

export const authGuard: CanActivateFn = () => {
  const store: Store<AppStoreInterface> = inject(Store);
  const router: Router = inject(Router);

  const state$: Observable<AuthStoreInterface> = store.pipe(select(selectAuthState));

  return state$.pipe(
    map((state) => !!state.user),
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/login']).then();
      }
    })
  );
};

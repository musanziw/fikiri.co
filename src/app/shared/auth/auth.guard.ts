import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {AppStoreInterface} from "../types/app-store.interface";
import {Observable} from "rxjs";
import {AuthStoreInterface} from "./types/auth-store.interface";
import {selectAuthState} from "./store/auth.reducers";

export const authGuard: CanActivateFn = () => {
  const store: Store<AppStoreInterface> = inject(Store)
  const router: Router = inject(Router)

  const authState$: Observable<AuthStoreInterface> = store.pipe(select(selectAuthState))

  authState$.subscribe((res) => {
    if (!res.user) {
      return router.navigate(['/login'])
    }
    return true
  })
  return true
};

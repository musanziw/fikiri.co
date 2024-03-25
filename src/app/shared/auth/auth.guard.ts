import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {AppStoreInterface} from "../types/app-store.interface";
import {userSelector} from "./store/auth.selectors";
import {Observable, Subscription} from "rxjs";
import {User} from "../types/models-interfaces";

export const authGuard: CanActivateFn = () => {
  const store: Store<AppStoreInterface> = inject(Store)
  const router: Router = inject(Router)
  const user$: Observable<User | null> = store.pipe(select(userSelector))
  let user = null
  const userSubscription$: Subscription = user$.subscribe(data => {
    user = data
  })

  if (!user) {
    userSubscription$.unsubscribe()
    return router.navigate(['/login'])
  }

  userSubscription$.unsubscribe()
  return true;
};

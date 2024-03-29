import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {catchError, map, Observable, of} from "rxjs";
import {User} from "../types/models-interfaces";
import {AuthService} from "./auth.service";


export const authenticatedRedirectGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const user$: Observable<User | null> = authService.authenticatedUser()

  return user$.pipe(
    map((user) => {
      if (user) {
        router.navigate(['/profile']);
        return false;
      }
      return true;
    }),
    catchError(() => of(true))
  );
};

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, of} from 'rxjs';
import {AuthService} from '../auth.service';
import {authActions} from "./auth.actions";

@Injectable()
export class AuthEffects {
  constructor(private authService: AuthService, private actions$: Actions) {
  }

  authentication$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.isAuthenticated),
      mergeMap(() => {
        return this.authService.authenticatedUser().pipe(
          map((res) => authActions.authenticate({user: res.data})),
          catchError((err) =>
            of(authActions.authenticationFailure({error: err.error.message}))
          )
        );
      })
    );
  });
}

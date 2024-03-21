import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as authActions from './auth.actions';
import {catchError, map, mergeMap, of} from 'rxjs';
import {AuthService} from '../auth.service';

@Injectable()
export class AuthEffects {
  constructor(private authService: AuthService, private actions$: Actions) {
  }

  authentication$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.authentication),
      mergeMap(() => {
        return this.authService.authenticatedUser().pipe(
          map((res) => authActions.authenticationSuccess(res.data)),
          catchError((err) =>
            of(authActions.authenticationFailure({error: err.error.message}))
          )
        );
      })
    );
  });
}

import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, of} from 'rxjs';
import {AuthService} from '../auth.service';
import {authActions} from "./auth.actions";

export const authEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(ofType(authActions.authenticatedUser),
      mergeMap(() => {
        return authService.authenticatedUser().pipe(
          map((user) => authActions.authenticateUser({user})),
          catchError((err) => of(authActions.authenticationFailure({error: err.error.message})))
        )
      }))
  }, {functional: true})



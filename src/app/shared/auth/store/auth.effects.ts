import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, of} from 'rxjs';
import {AuthService} from '../auth.service';
import {authActions} from "./auth.actions";
import {Router} from "@angular/router";

export const authenticateEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(ofType(authActions.authentication),
      mergeMap(() => {
        return authService.authenticatedUser().pipe(
          map((user) => authActions.authenticateUser({user})),
          catchError(() => of())
        )
      }))
  }, {functional: true}
)

export const loginEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return actions$.pipe(ofType(authActions.login),
      mergeMap(({payload}) => {
        return authService.login(payload).pipe(
          map((user) => {
            router.navigate(['/profile']);
            return authActions.authenticateUser({user})
          }),
          catchError((err) => of(authActions.authenticationFailure({error: err.error.message})))
        )
      }))
  }, {functional: true}
)

export const registerEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return actions$.pipe(ofType(authActions.register),
      mergeMap(({payload}) => {
        return authService.register(payload).pipe(
          map(() => {
            router.navigate(['/profile']);
            return authActions.login({payload: {email: payload.email, password: payload.password}})
          }),
          catchError((err) => {
            const error = err.error.message;
            if (typeof error === 'string') {
              router.navigate(['/register']);
              return of(authActions.authenticationFailure({error}))
            }
            return of(authActions.validationErrors({validationErrors: error}))
          })
        )
      }))
  }, {functional: true}
)

export const logoutEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return actions$.pipe(ofType(authActions.logout),
      mergeMap(() => {
        router.navigate(['/']);
        return authService.logout().pipe(map(() => authActions.logout()))
      }),
      catchError(() => of())
    )
  }, {functional: true}
)



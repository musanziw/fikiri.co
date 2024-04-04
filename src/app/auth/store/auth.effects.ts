import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, combineLatestWith, map, mergeMap, of} from 'rxjs';
import {AuthService} from '../auth.service';
import {authActions} from "./auth.actions";
import {Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {selectUser} from "./auth.reducers";

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

export const resetPasswordRequestEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return actions$.pipe(ofType(authActions.resetPasswordRequest),
      mergeMap(({payload}) => {
        return authService.resetPasswordRequest(payload)
          .pipe(map(() => {
              router.navigate(['/reset-password']);
              return authActions.resetPasswordRequestSuccess()
            }),
            catchError((err) => {
              const error = err.error.message;
              if (typeof error === 'string') {
                router.navigate(['/reset-password-request']);
                return of(authActions.authenticationFailure({error}))
              }
              return of(authActions.validationErrors({validationErrors: error}))
            })
          )
      }))
  }, {functional: true}
)

export const resetPasswordEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return actions$.pipe(ofType(authActions.resetPassword),
      mergeMap(({payload}) => {
        return authService.resetPassword(payload).pipe(
          map(() => {
            router.navigate(['/login']);
            return authActions.resetPasswordSuccess()
          }),
          catchError((err) => {
            const error = err.error.message;
            if (typeof error === 'string') {
              router.navigate(['/reset-password']);
              return of(authActions.authenticationFailure({error}))
            }
            return of(authActions.validationErrors({validationErrors: error}))
          })
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
export const updateProfileEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return actions$.pipe(ofType(authActions.updateProfile),
      mergeMap(({payload}) => {
        return authService.updateProfile(payload).pipe(
          map((user) => {
            router.navigate(['/profile']);
            return authActions.authenticateUser({user})
          }),
          catchError((err) => {
            const error = err.error.message;
            if (typeof error === 'string') {
              return of(authActions.authenticationFailure({error}))
            }
            router.navigate(['/profile']);
            return of(authActions.validationErrors({validationErrors: error}))
          })
        )
      }))
  }, {functional: true}
)

export const updateImageEffect = createEffect(
  (actions$ = inject(Actions), store$ = inject(Store), authService = inject(AuthService), router = inject(Router)) => {
    return actions$.pipe(ofType(authActions.updateImage),
      combineLatestWith(store$.pipe(select(selectUser))),
      mergeMap(([actions, user]) => {
        return authService.updateImage(user?.id, actions.payload).pipe(
          map(() => authActions.updateImageSuccess()),
          catchError((err) => of(authActions.authenticationFailure({error: err.error.message})))
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



import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {LoginService} from "../login.service";
import {loginActions} from "./login.actions";
import {catchError, map, of, switchMap} from "rxjs";

export const loginEffect = createEffect(
  (actions$ = inject(Actions), loginService = inject(LoginService)) => {
    return actions$.pipe(
      ofType(loginActions.authentication),
      switchMap(({payload}) => {
        return loginService.login(payload).pipe(
          map((user) => loginActions.authenticateUser({user})),
          catchError((err) => of(loginActions.authenticationFailure({error: err.error.message})))
        )
      }))
  }, {functional: true}
)

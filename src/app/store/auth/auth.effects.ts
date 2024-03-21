import {inject, Injectable} from "@angular/core";
import {AuhtService} from "./auth.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as authActions from "./auth.actions";
import {map, mergeMap} from "rxjs";


@Injectable()
export class AuthEffects {
  authService = inject(AuhtService)
  actions$ = inject(Actions)

  isAuth$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(authActions.isAuthenticated),
        mergeMap(() => {
          return this.authService.getCurrentUser().pipe(map((res) => authActions.isAuthenticated(res.data)))
        }))
    }
  )
}

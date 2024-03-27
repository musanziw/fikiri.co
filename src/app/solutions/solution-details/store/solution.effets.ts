import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {SolutionService} from "../solution.service";
import {solutionActions} from "./solution.actions";
import {catchError, map, of, switchMap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

export const solutionEffets = createEffect(
  (actions$ = inject(Actions), solutionService = inject(SolutionService)) => {
    return actions$.pipe(
      ofType(solutionActions.load),
      switchMap(({id}) => {
        return solutionService.getSolution(id).pipe(
          map((solution) => solutionActions.loadSuccess({solution})),
          catchError((error: HttpErrorResponse) => of(solutionActions.loadFailure({error: error.error.message})))
        )
      })
    )
  }, {functional: true}
)

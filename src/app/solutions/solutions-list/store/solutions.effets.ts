import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {SolutionsService} from "../solutions.service";
import {solutionsActions} from "./solutions.actions";
import {catchError, map, of, switchMap, withLatestFrom} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {select, Store} from "@ngrx/store";
import {selectCursor} from "./solutions.reducers";

export const solutionsEffet = createEffect(
  (actions$ = inject(Actions), solutionsService = inject(SolutionsService)) => {
    return actions$.pipe(
      ofType(solutionsActions.load),
      switchMap(() => {
        return solutionsService.getMappedSolutions().pipe(
          map((solutions) => solutionsActions.loadSuccess({solutions})),
          catchError((error) => of(solutionsActions.loadFailure({error})))
        )
      })
    )
  }, {functional: true}
)

export const loadMoreSolutionsEffet = createEffect(
  (actions$ = inject(Actions), solutionsService = inject(SolutionsService), store$ = inject(Store)) => {
    return actions$.pipe(
      ofType(solutionsActions.loadMore),
      withLatestFrom(store$.pipe(select(selectCursor))),
      switchMap(([_, cursor]) => {
        return solutionsService.getMappedSolutions(cursor + 1).pipe(
          map((solutions) => solutionsActions.loadSuccess({solutions})),
          catchError((error: HttpErrorResponse) => of(solutionsActions.loadFailure({error: error.error.message})))
        );
      })
    )
  }, {functional: true}
)


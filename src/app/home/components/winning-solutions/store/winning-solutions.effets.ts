import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {WinningSolutionsService} from "../winning-solutions.service";
import {winningSolutionsActions} from "./winning-solutions.actions";
import {catchError, map, mergeMap, of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Solution} from "../../../../shared/types/models-interfaces";

export const winningSolutionsEffect = createEffect(
  (actions$ = inject(Actions), winningSolutionsService = inject(WinningSolutionsService)) => {
    return actions$.pipe(
      ofType(winningSolutionsActions.load),
      mergeMap(() => {
        return winningSolutionsService.getWinningSolutions().pipe(
          map((solutions: Solution[]) => winningSolutionsActions.loadSuccess({solutions})),
          catchError((error: HttpErrorResponse) => of(winningSolutionsActions.loadFailure({error: error.error.message})))
        );
      })
    );
  }, {functional: true}
)



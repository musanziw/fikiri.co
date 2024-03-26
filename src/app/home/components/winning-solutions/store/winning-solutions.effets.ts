import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, of} from 'rxjs';
import {WinningSolutionsService} from '../winning-solutions.service';
import {winningSolutionsActions} from "./winning-solutions.actions";

@Injectable()
export class WinningSolutionsEffects {
  constructor(
    private winningSolutionsService: WinningSolutionsService,
    private actions$: Actions
  ) {
  }

  getWinningSolutions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(winningSolutionsActions.load),
      mergeMap(() => {
        return this.winningSolutionsService.getWinningSolutions().pipe(
          map((solutions) =>
            winningSolutionsActions.loadSuccess({solutions})
          ),
          catchError((error) =>
            of(winningSolutionsActions.loadFailure({error: error.message}))
          )
        );
      })
    );
  });
}

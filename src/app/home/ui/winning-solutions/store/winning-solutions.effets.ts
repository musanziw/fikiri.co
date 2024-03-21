import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as winningSolutionsActions from './winning-solutions.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { WinningSolutionsService } from '../winning-solutions.service';

@Injectable()
export class WinningSolutionsEffects {
  constructor(
    private winningSolutionsService: WinningSolutionsService,
    private actions$: Actions
  ) {}

  getWinningSolutions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(winningSolutionsActions.load),
      mergeMap(() => {
        return this.winningSolutionsService.getWinningSolutions().pipe(
          map((res) =>
            winningSolutionsActions.loadSuccess({ solutions: res.data })
          ),
          catchError((error) =>
            of(winningSolutionsActions.loadFailure({ error: error.message }))
          )
        );
      })
    );
  });
}

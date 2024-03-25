import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as solutionsActions from './solutions.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { SolutionsService } from '../solutions.service';

@Injectable()
export class SolutionsEffect {
  constructor(
    private solutionsService: SolutionsService,
    private actions$: Actions
  ) {}

  loadSolutions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(solutionsActions.load),
      mergeMap(() => {
        return this.solutionsService.getMappedSolutions(1).pipe(
          map((res) => solutionsActions.loadSuccess({ solutions: res.data })),
          catchError((error) =>
            of(solutionsActions.loadFailure({ error: error.message }))
          )
        );
      })
    );
  });

  loadMoreSolutions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(solutionsActions.loadMore),
      mergeMap(() => {
        return this.solutionsService.getMappedSolutions(2).pipe(
          map((res) => solutionsActions.loadSuccess({ solutions: res.data })),
          catchError((error) =>
            of(solutionsActions.loadFailure({ error: error.message }))
          )
        );
      })
    );
  });
}

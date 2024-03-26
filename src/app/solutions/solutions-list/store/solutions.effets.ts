import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, of} from 'rxjs';
import {SolutionsService} from '../solutions.service';
import {solutionsActions} from "./solutions.actions";

@Injectable()
export class SolutionsEffect {
  constructor(
    private solutionsService: SolutionsService,
    private actions$: Actions
  ) {
  }

  loadSolutions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(solutionsActions.load),
      mergeMap(() => {
        return this.solutionsService.getMappedSolutions(1).pipe(
          map((solutions) => solutionsActions.loadSuccess({solutions})),
          catchError((error) =>
            of(solutionsActions.loadFailure({error: error.message}))
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
          map((solutions) => solutionsActions.loadSuccess({solutions})),
          catchError((error) =>
            of(solutionsActions.loadFailure({error: error.message}))
          )
        );
      })
    );
  });
}

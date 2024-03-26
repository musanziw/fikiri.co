import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, of, switchMap} from 'rxjs';
import {SolutionService} from '../solution.service';
import {ActivatedRoute} from '@angular/router';
import {solutionActions} from "./solution.actions";

@Injectable()
export class SolutionEffect {
  constructor(
    private solutionService: SolutionService,
    private actions$: Actions,
    private route: ActivatedRoute
  ) {
  }

  loadSolution$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(solutionActions.load),
      mergeMap(() => {
        return this.route.paramMap.pipe(
          switchMap((params) => {
            // const id = params.get('id');
            // console.log('id', id);
            return this.solutionService.getSolution(1).pipe(
              map((res) =>
                solutionActions.loadSuccess({solution: res.data})
              ),
              catchError((error) =>
                of(solutionActions.loadFailure({error: error.message}))
              )
            );
          })
        );
      })
    );
  });
}

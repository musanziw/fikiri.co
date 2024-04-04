import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {recentCallActions} from './recent-call.actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {RecentCallService} from '../recent-call.service';

export const recentCallEffets = createEffect(
  (actions$ = inject(Actions), callsService = inject(RecentCallService)) => {
    return actions$.pipe(
      ofType(recentCallActions.load),
      switchMap(() => {
        return callsService.getRecent().pipe(
          map((call) => recentCallActions.loadSuccess({call})),
          catchError((error: HttpErrorResponse) =>
            of(recentCallActions.loadFailure({error: error.error.message}))
          )
        );
      })
    );
  },
  {functional: true}
);

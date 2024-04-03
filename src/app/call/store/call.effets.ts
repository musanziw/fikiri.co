import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {callActions} from './call.actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {CallService} from '../call.service';

export const callEffets = createEffect(
  (actions$ = inject(Actions), callsService = inject(CallService)) => {
    return actions$.pipe(
      ofType(callActions.load),
      switchMap(({id}) => {
        return callsService.getCall(id).pipe(
          map((callsReponse) => callActions.loadSuccess(callsReponse)),
          catchError((error: HttpErrorResponse) =>
            of(callActions.loadFailure({error: error.error.message}))
          )
        );
      })
    );
  },
  {functional: true}
);

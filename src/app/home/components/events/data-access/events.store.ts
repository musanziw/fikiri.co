import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { CallsStoreInterface } from '../types/events-store.interface';
import { CallsService } from './events.service';
import { exhaustMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CallsStore extends ComponentStore<CallsStoreInterface> {
  vm$: Observable<CallsStoreInterface>;

  constructor(private callsService: CallsService) {
    super({ isLoading: false, calls: [], error: null });
    this.vm$ = this.select((state) => state);
  }

  setIsLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  setCalls = this.updater((state, calls: CallsStoreInterface['calls']) => ({ ...state, calls }));
  setError = this.updater((state, error: CallsStoreInterface['error']) => ({ ...state, error }));

  getCalls = this.effect<void>((trigger$) => {
    return trigger$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap(() =>
        this.callsService.getCalls().pipe(
          tapResponse({
            next: (calls) => this.setCalls(calls),
            error: (error: HttpErrorResponse) => this.setError(error.error.message),
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    );
  });
}

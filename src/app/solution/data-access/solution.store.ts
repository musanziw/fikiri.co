import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { SolutionStoreInterface } from '../types/solution-store.interface';
import { exhaustMap, Observable, tap } from 'rxjs';
import { SolutionResponseInterface } from '../types/solution-response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { SolutionService } from './solution.service';
import { User } from '../../shared/types/models-interfaces';
import { selectUser } from '../../shared/auth/data-access/auth.reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class SolutionStore extends ComponentStore<SolutionStoreInterface> {
  vm$: Observable<{ solutionStore: SolutionStoreInterface; user: User | null }>;

  constructor(private solutionService: SolutionService, private store: Store) {
    super({ isLoading: false, solutionResponse: null, error: null });
    this.vm$ = this.select({
      solutionStore: this.state$,
      user: this.store.select(selectUser)
    });
  }

  setIsLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  setError = this.updater((state, error: string) => ({ ...state, error }));
  setSolutionResponse = this.updater((state, solutionResponse: SolutionResponseInterface | null) => ({
    ...state,
    solutionResponse
  }));

  getSolution = this.effect((id$: Observable<number>) =>
    id$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap((id) =>
        this.solutionService.getSolution(id).pipe(
          tapResponse({
            next: (solutionResponse) => this.setSolutionResponse(solutionResponse),
            error: (error: HttpErrorResponse) => this.setError(error.error.message),
            finalize: () => this.setIsLoading(false)
          })
        )
      ),
      tap(() => this.setIsLoading(false))
    )
  );

  uploadImage = this.effect((payload: Observable<{ file: FormData; solutionId: number }>) =>
    payload.pipe(
      exhaustMap((payload) =>
        this.solutionService.uploadImage(payload.solutionId, payload.file).pipe(
          tapResponse({
            next: (solution) => this.getSolution(solution.id),
            error: () => {},
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    )
  );
}

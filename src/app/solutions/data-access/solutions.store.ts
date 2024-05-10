import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { SolutionsStoreInterface } from '../types/solutions-store.interface';
import { exhaustMap, Observable, tap } from 'rxjs';
import { SolutionsService } from './solutions.service';
import { Solution, Thematic } from '../../shared/types/models-interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { SolutionsReponseInterface } from '../types/solutions-response.interface';

@Injectable()
export class SolutionsStore extends ComponentStore<SolutionsStoreInterface> {
  vm$: Observable<SolutionsStoreInterface>;

  constructor(private solutionService: SolutionsService) {
    super({ isLoading: false, solutions: [], thematics: [], count: 1, error: null });
    this.vm$ = this.select((state) => state);
  }

  setIsLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  setCount = this.updater((state, count: number) => ({ ...state, count }));
  setThematics = this.updater((state, thematics: Thematic[]) => ({ ...state, thematics }));
  setSolutions = this.updater((state, solutions: Solution[]) => ({ ...state, solutions }));
  setError = this.updater((state, error: string) => ({ ...state, error }));

  getSolutions = this.effect((trigger$: Observable<number>) =>
    trigger$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap((page) =>
        this.solutionService.getSolutions(page).pipe(
          tapResponse({
            next: (solutionsResponse: SolutionsReponseInterface) => {
              this.setSolutions(solutionsResponse.solutions);
              this.setCount(solutionsResponse.count);
            },
            error: (error: HttpErrorResponse) => this.setError(error.error.message),
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    )
  );

  getThematics = this.effect<void>((trigger$: Observable<void>) =>
    trigger$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap(() =>
        this.solutionService.getThematics().pipe(
          tapResponse({
            next: (thematics) => this.setThematics(thematics),
            error: (error: HttpErrorResponse) => this.setError(error.error.message),
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    )
  );
}

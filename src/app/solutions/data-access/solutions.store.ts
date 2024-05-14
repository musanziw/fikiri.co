import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { SolutionsStoreInterface } from '../types/solutions-store.interface';
import { exhaustMap, Observable, tap } from 'rxjs';
import { SolutionsService } from './solutions.service';
import { Event, Solution, Thematic } from '../../shared/types/models-interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { SolutionsReponseInterface } from '../types/solutions-response.interface';
import { QueryParams } from '../types/query-params.interface';

@Injectable()
export class SolutionsStore extends ComponentStore<SolutionsStoreInterface> {
  vm$: Observable<SolutionsStoreInterface>;

  constructor(private solutionService: SolutionsService) {
    super({ isLoading: false, solutions: [], events: [], thematics: [], isFiltering: false, count: 1, error: null });
    this.vm$ = this.select((state) => state);
  }

  setIsLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  setIsFiltering = this.updater((state, isFiltering: boolean) => ({ ...state, isFiltering }));
  setCount = this.updater((state, count: number) => ({ ...state, count }));
  setThematics = this.updater((state, thematics: Thematic[]) => ({ ...state, thematics }));
  setEvents = this.updater((state, events: Event[]) => ({ ...state, events }));
  setSolutions = this.updater((state, solutions: Solution[]) => ({ ...state, solutions }));
  setError = this.updater((state, error: string) => ({ ...state, error }));

  getSolutions = this.effect((trigger$: Observable<QueryParams>) =>
    trigger$.pipe(
      tap((queryParams) => {
        if (queryParams.odd || queryParams.event || queryParams.thematic) this.setIsFiltering(true);
        else this.setIsLoading(true);
      }),
      exhaustMap((queryParams) =>
        this.solutionService.getSolutions(queryParams).pipe(
          tapResponse({
            next: (res: SolutionsReponseInterface) => {
              this.setSolutions(res.solutions);
              this.setCount(res.count);
            },
            error: (error: HttpErrorResponse) => this.setError(error.error.message),
            finalize: () => {
              this.setIsLoading(false);
              this.setIsFiltering(false);
            }
          })
        )
      )
    )
  );

  getThematics = this.effect((trigger$: Observable<number>) =>
    trigger$.pipe(
      exhaustMap((eventId) =>
        this.solutionService.getThematics(eventId).pipe(
          tapResponse({
            next: (thematics) => this.setThematics(thematics),
            error: (error: HttpErrorResponse) => this.setError(error.error.message)
          })
        )
      )
    )
  );

  getEvents = this.effect<void>((trigger$: Observable<void>) =>
    trigger$.pipe(
      exhaustMap(() =>
        this.solutionService.getEvents().pipe(
          tapResponse({
            next: (events) => this.setEvents(events),
            error: (error: HttpErrorResponse) => this.setError(error.error.message)
          })
        )
      )
    )
  );
}

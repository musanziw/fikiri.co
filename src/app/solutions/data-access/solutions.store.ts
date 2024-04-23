import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {tapResponse} from "@ngrx/operators";
import {SolutionsStoreInterface} from "../types/solutions-store.interface";
import {combineLatestWith, exhaustMap, Observable, tap} from "rxjs";
import {SolutionsService} from "./solutions.service";
import {Solution} from "../../shared/types/models-interfaces";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class SolutionsStore extends ComponentStore<SolutionsStoreInterface> {
  vm$: Observable<SolutionsStoreInterface>

  constructor(private solutionService: SolutionsService) {
    super({cursor: 1, isLoading: false, isLoadingMore: false, solutions: [], error: null});
    this.vm$ = this.select((state) => state)
  }

  setIsLoading = this.updater((state, isLoading: boolean) => ({...state, isLoading}))
  setIsCursor = this.updater((state, cursor: number) => ({...state, cursor}))
  setIsLoadingMore = this.updater((state, isLoadingMore: boolean) => ({...state, isLoadingMore}))
  setSolutions = this.updater((state, solutions: Solution[]) => ({...state, solutions}))
  setError = this.updater((state, error: string) => ({...state, error}))

  load = this.effect<void>((trigger$: Observable<void>) => trigger$.pipe(
    tap(() => this.setIsLoading(true)),
    exhaustMap(() => this.solutionService.getSolutions().pipe(
      tapResponse({
        next: (solutions) => this.setSolutions(solutions),
        error: (error: HttpErrorResponse) => this.setError(error.error.message),
        finalize: () => this.setIsLoading(false)
      })
    )),
  ))

  loadMore = this.effect<void>((trigger$: Observable<void>) => trigger$.pipe(
    tap(() => this.setIsLoadingMore(true)),
    combineLatestWith(this.select((state) => state.cursor)),
    exhaustMap(([_, cursor]) => this.solutionService.getSolutions(cursor + 1).pipe(
      tapResponse({
        next: (solutions) => {
          this.setSolutions(solutions)
          this.setIsCursor(cursor + 1)
        },
        error: (error: HttpErrorResponse) => this.setError(error.error.message),
        finalize: () => this.setIsLoadingMore(false)
      })
    ))
  ))
}

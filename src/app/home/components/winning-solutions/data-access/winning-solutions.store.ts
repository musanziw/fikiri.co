import {Injectable} from "@angular/core";
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {WinningSolutionsStoreInterface} from "../types/winning-solutions-store.interface";
import {exhaustMap, Observable, of, tap} from "rxjs";
import {Solution} from "../../../../shared/types/models-interfaces";
import {WinningSolutionsService} from "./winning-solutions.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class WinningSolutionsStore extends ComponentStore<WinningSolutionsStoreInterface> {
  vm$: Observable<WinningSolutionsStoreInterface>

  constructor(private winningSolutionsService: WinningSolutionsService) {
    super({isLoading: false, solutions: [], error: null});
    this.vm$ = this.select(state => state)
  }

  setIsLoading = this.updater((state, isLoading: boolean) => ({...state, isLoading}))
  setSolutions = this.updater((state, solutions: Solution[]) => ({...state, solutions}))
  setError = this.updater((state, error: string) => ({...state, error}))

  loadSolutions = this.effect<void>((trigger$: Observable<void>) => trigger$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap(() => this.winningSolutionsService.getWinningSolutions().pipe(
        tapResponse({
          next: (solutions) => this.setSolutions(solutions),
          error: (error: HttpErrorResponse) => of(this.setError(error.error.message)),
          finalize: () => this.setIsLoading(false)
        })
      ))
    )
  )
}

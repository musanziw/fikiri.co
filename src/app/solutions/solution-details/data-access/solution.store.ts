import {Injectable} from "@angular/core";
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {SolutionStoreInterface} from "../types/solution-store.interface";
import {exhaustMap, Observable, tap} from "rxjs";
import {SolutionResponseInterface} from "../types/solution-response.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {SolutionService} from "./solution.service";

@Injectable()
export class SolutionStore extends ComponentStore<SolutionStoreInterface> {
  vm$: Observable<SolutionStoreInterface>

  constructor(private solutionService: SolutionService) {
    super({isLoading: false, solutionResponse: null, error: null})
    this.vm$ = this.select(state => state)
  }

  setIsLoading = this.updater((state, isLoading: boolean) => ({...state, isLoading}));
  setError = this.updater((state, error: string) => ({...state, error}));
  setSolutionResponse = this.updater((state, solutionResponse: SolutionResponseInterface | null) => ({
    ...state,
    solutionResponse
  }));

  getSolution = this.effect((id$: Observable<number>) => id$.pipe(
    tap(() => this.setIsLoading(true)),
    exhaustMap(id => this.solutionService.getSolution(id).pipe(
      tapResponse({
        next: (solutionResponse) => this.setSolutionResponse(solutionResponse),
        error: (error: HttpErrorResponse) => this.setError(error.error.message),
        finalize: () => this.setIsLoading(false)
      })
    )),
    tap(() => this.setIsLoading(false)),
  ));
}

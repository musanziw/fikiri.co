import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {SolutionStoreInterface} from "../types/solution-store.interface";
import {catchError, map, mergeMap, Observable, of, tap} from "rxjs";
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
    mergeMap(id => this.solutionService.getSolution(id).pipe(
      map((solutionResponse) => this.setSolutionResponse(solutionResponse)),
      catchError((error: HttpErrorResponse) => of(this.setError(error.error.message)))
    )),
    tap(() => this.setIsLoading(false)),
  ));
}

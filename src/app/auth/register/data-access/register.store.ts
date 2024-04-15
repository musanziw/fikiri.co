import {Injectable} from "@angular/core";
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {RegisterStoreInterface} from "../types/register-store.interface";
import {ApiValiationsErrorsInterface} from "../../../shared/auth/types/api-valiations-errors.interface";
import {RegisterPayloadInterface} from "../types/register-payload.interface";
import {exhaustMap, Observable, of, tap} from "rxjs";
import {RegisterService} from "./register.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class RegisterStore extends ComponentStore<RegisterStoreInterface> {
  vm$: Observable<RegisterStoreInterface>;

  constructor(private registerService: RegisterService, private router: Router) {
    super({isLoading: false, error: null, validationErrors: []});
    this.vm$ = this.select(state => state);
  }

  setIsLoading = this.updater((state, isLoading: boolean) => ({...state, isLoading}));
  setError = this.updater((state, error: string) => ({...state, error}));
  setValidationErrors = this.updater((state, validationErrors: ApiValiationsErrorsInterface[]) => ({
    ...state,
    validationErrors
  }))

  register = this.effect((payload$: Observable<RegisterPayloadInterface>) => {
    return payload$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap((payload) => this.registerService.register(payload).pipe(
        tapResponse({
          next: () => this.router.navigateByUrl('/login'),
          error: (error: HttpErrorResponse) => {
            const message = error.error.message
            if (typeof message === 'string')
              return of(this.setError(error.error.message))
            return of(this.setValidationErrors(error.error.message))
          },
          finalize: () => this.setIsLoading(false)
        })
      )),
    )
  })
}

import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {catchError, map, mergeMap, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {ApiValiationsErrorsInterface} from "../../../shared/auth/types/api-valiations-errors.interface";
import {ResetPasswordStoreInterface} from "../types/reset-password-store.interface";
import {ResetPasswordService} from "./reset-pasword.service";
import {ResetPasswordPayloadInterface} from "../types/reset-password-payload.interface";

@Injectable()
export class ResetPasswordStore extends ComponentStore<ResetPasswordStoreInterface> {
  vm$: Observable<ResetPasswordStoreInterface>;

  constructor(private resetPasswordService: ResetPasswordService, private router: Router) {
    super({isLoading: false, error: null, validationErrors: []});
    this.vm$ = this.select(state => state);
  }

  private setIsLoading = this.updater((state, isLoading: boolean) => ({...state, isLoading}));
  private setError = this.updater((state, error: string) => ({...state, error}));
  private setValidationErrors = this.updater((state, validationErrors: ApiValiationsErrorsInterface[]) => ({
    ...state,
    validationErrors
  }))

  resetPassword = this.effect((payload$: Observable<ResetPasswordPayloadInterface>) => {
    return payload$.pipe(
      tap(() => this.setIsLoading(true)),
      mergeMap((payload) => this.resetPasswordService.resetPassword(payload).pipe(
        map(() => this.router.navigateByUrl('/login')),
        catchError((error) => {
          const message = error.err.message
          if (typeof message === 'string')
            return of(this.setError(error.error.message))
          return of(this.setValidationErrors(error.error.message))
        })
      )),
      tap(() => this.setIsLoading(false)),
    )
  })
}

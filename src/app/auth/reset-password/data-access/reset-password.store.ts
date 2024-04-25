import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { exhaustMap, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ApiValiationsErrorsInterface } from '../../../shared/auth/types/api-valiations-errors.interface';
import { ResetPasswordStoreInterface } from '../types/reset-password-store.interface';
import { ResetPasswordService } from './reset-pasword.service';
import { ResetPasswordPayloadInterface } from '../types/reset-password-payload.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ResetPasswordStore extends ComponentStore<ResetPasswordStoreInterface> {
  vm$: Observable<ResetPasswordStoreInterface>;

  constructor(
    private resetPasswordService: ResetPasswordService,
    private router: Router,
  ) {
    super({ isLoading: false, error: null, validationErrors: [] });
    this.vm$ = this.select((state) => state);
  }

  private setIsLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  private setError = this.updater((state, error: string) => ({ ...state, error }));
  private setValidationErrors = this.updater((state, validationErrors: ApiValiationsErrorsInterface[]) => ({
    ...state,
    validationErrors,
  }));

  resetPassword = this.effect((payload$: Observable<ResetPasswordPayloadInterface>) => {
    return payload$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap((payload) =>
        this.resetPasswordService.resetPassword(payload).pipe(
          tapResponse({
            next: () => this.router.navigateByUrl('/login'),
            error: (error: HttpErrorResponse) => {
              const message = error.error.message;
              if (typeof message === 'string') return this.setError(error.error.message);
              return this.setValidationErrors(error.error.message);
            },
            finalize: () => this.setIsLoading(false),
          }),
        ),
      ),
    );
  });
}

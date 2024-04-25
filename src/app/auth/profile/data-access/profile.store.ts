import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { ProfileStoreInterface } from '../types/profile-store.interface';
import { combineLatestWith, exhaustMap, Observable, tap } from 'rxjs';
import { InfoPayloadInterface } from '../types/info-payload.interface';
import { ProfileService } from './profile.service';
import { authActions } from '../../../shared/auth/data-access/auth.actions';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../shared/auth/data-access/auth.reducers';
import { User } from '../../../shared/types/models-interfaces';
import { ApiValiationsErrorsInterface } from '../../../shared/auth/types/api-valiations-errors.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { PasswordPayloadInterface } from '../types/password-payload.interface';

@Injectable()
export class ProfileStore extends ComponentStore<ProfileStoreInterface> {
  user$: Observable<User | null>;
  profileState$: Observable<ProfileStoreInterface>;
  vm$: Observable<{ profileState: ProfileStoreInterface; user: User | null }>;

  constructor(
    private profileService: ProfileService,
    private store: Store
  ) {
    super({
      isUpdatingInfo: false,
      infoUpdateSuccess: null,
      infoUpdateError: null,
      isUpdatingPassword: false,
      passwordUpdateSucess: null,
      passwordUpdateError: null,
      isUpdatingImage: false,
      updateImageSuccess: null,
      updateImageError: null,
      validationErrors: []
    });
    this.profileState$ = this.select((state) => state);
    this.user$ = this.store.select(selectUser);
    this.vm$ = this.select({
      profileState: this.profileState$,
      user: this.user$
    });
  }

  setIsUpdatingInfo = this.updater((state, isUpdatingInfo: boolean) => ({ ...state, isUpdatingInfo }));
  setInfoUpdateSuccess = this.updater((state, infoUpdateSuccess: string) => ({ ...state, infoUpdateSuccess }));
  setInfoUpdateError = this.updater((state, infoUpdateError: string) => ({ ...state, infoUpdateError }));
  setIsUpdatingPassword = this.updater((state, isUpdatingPassword: boolean) => ({ ...state, isUpdatingPassword }));
  setPasswordUpdateSucess = this.updater((state, passwordUpdateSucess: string) => ({ ...state, passwordUpdateSucess }));
  setPasswordUpdateError = this.updater((state, passwordUpdateError: string) => ({ ...state, passwordUpdateError }));
  setIsUpdatingImage = this.updater((state, isUpdatingImage: boolean) => ({ ...state, isUpdatingImage }));
  setUpdateImageSuccess = this.updater((state, updateImageSuccess: string) => ({ ...state, updateImageSuccess }));
  setUpdateImageError = this.updater((state, updateImageError: string) => ({ ...state, updateImageError }));
  setValidationErrors = this.updater((state, validationErrors: ApiValiationsErrorsInterface[]) => ({
    ...state,
    validationErrors
  }));

  upatedProfile = this.effect((payload$: Observable<InfoPayloadInterface>) =>
    payload$.pipe(
      tap(() => this.setIsUpdatingInfo(true)),
      exhaustMap((payload) =>
        this.profileService.updateProfile(payload).pipe(
          tapResponse({
            next: (user) => {
              this.setInfoUpdateSuccess('Profil mis à jour avec succès');
              this.store.dispatch(authActions.authenticateUser({ user }));
            },
            error: (error: HttpErrorResponse) => {
              const message = error.error.message;
              if (typeof message === 'string') return this.setInfoUpdateError(error.error.message);
              return this.setValidationErrors(error.error.message);
            },
            finalize: () => this.setIsUpdatingInfo(false)
          })
        )
      )
    )
  );

  updateImage = this.effect((payload: Observable<FormData>) =>
    payload.pipe(
      tap(() => this.setIsUpdatingImage(true)),
      combineLatestWith(this.store.select(selectUser)),
      exhaustMap(([payload, user]) =>
        this.profileService.updateImage(user?.id, payload).pipe(
          tapResponse({
            next: () => this.setUpdateImageSuccess('Image de profil mise à jour avec succès'),
            error: (err: HttpErrorResponse) => this.setUpdateImageError(err.error.message),
            finalize: () => this.setIsUpdatingImage(false)
          })
        )
      )
    )
  );

  updatePassword = this.effect((payload$: Observable<PasswordPayloadInterface>) =>
    payload$.pipe(
      tap(() => this.setIsUpdatingPassword(true)),
      exhaustMap((payload) =>
        this.profileService.updatePassword(payload).pipe(
          tapResponse({
            next: () => this.setPasswordUpdateSucess('Mot de passe mis à jour avec succès'),
            error: (error: HttpErrorResponse) => {
              const message = error.error.message;
              if (typeof message === 'string') return this.setPasswordUpdateError(error.error.message);
              return this.setValidationErrors(error.error.message);
            },
            finalize: () => this.setIsUpdatingPassword(false)
          })
        )
      )
    )
  );
}

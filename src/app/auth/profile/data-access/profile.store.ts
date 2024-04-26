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
      infoUpdateMessage: {
        type: null,
        message: null
      },
      isUpdatingPassword: false,
      passwordUpdateMessage: {
        type: null,
        message: null
      },
      isUpdatingImage: false,
      updateImageMessage: {
        type: null,
        message: null
      },
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
  setIsUpdatingPassword = this.updater((state, isUpdatingPassword: boolean) => ({ ...state, isUpdatingPassword }));
  setIsUpdatingImage = this.updater((state, isUpdatingImage: boolean) => ({ ...state, isUpdatingImage }));
  setInfoUpdateMessage = this.updater((state, infoUpdateMessage: ProfileStoreInterface['infoUpdateMessage']) => ({
    ...state,
    infoUpdateMessage
  }));
  setPasswordUpdateMessage = this.updater(
    (state, passwordUpdateMessage: ProfileStoreInterface['passwordUpdateMessage']) => ({
      ...state,
      passwordUpdateMessage
    })
  );
  setUpdateImageMessage = this.updater((state, updateImageMessage: ProfileStoreInterface['updateImageMessage']) => ({
    ...state,
    updateImageMessage
  }));
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
              this.setInfoUpdateMessage({ type: 'success', message: 'Informations mises à jour avec succès' });
              this.store.dispatch(authActions.authenticateUser({ user }));
            },
            error: (error: HttpErrorResponse) => {
              const message = error.error.message;
              if (typeof message === 'string') return this.setInfoUpdateMessage({ type: 'error', message });
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
            next: (user) => {
              this.setUpdateImageMessage({ type: 'success', message: 'Image mise à jour avec succès' });
              this.store.dispatch(authActions.authenticateUser({ user }));
            },
            error: (err: HttpErrorResponse) => {
              this.setUpdateImageMessage({ type: 'error', message: err.error.message });
            },
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
            next: () =>
              this.setPasswordUpdateMessage({ type: 'success', message: 'Mot de passe mis à jour avec succès' }),
            error: (error: HttpErrorResponse) => {
              const message = error.error.message;
              if (typeof message === 'string') return this.setPasswordUpdateMessage({ type: 'error', message });
              return this.setValidationErrors(message);
            },
            finalize: () => this.setIsUpdatingPassword(false)
          })
        )
      )
    )
  );
}

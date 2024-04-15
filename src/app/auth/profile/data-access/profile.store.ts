import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {ProfileStoreInterface} from "../types/profile-store.interface";
import {catchError, combineLatestWith, map, mergeMap, Observable, of, tap} from "rxjs";
import {ProfilePayloadInterface} from "../types/profile-payload.interface";
import {ProfileService} from "./profile.service";
import {authActions} from "../../../shared/auth/data-access/auth.actions";
import {Store} from "@ngrx/store";
import {selectUser} from "../../../shared/auth/data-access/auth.reducers";
import {User} from "../../../shared/types/models-interfaces";
import {ApiValiationsErrorsInterface} from "../../../shared/auth/types/api-valiations-errors.interface";

@Injectable()
export class ProfileStore extends ComponentStore<ProfileStoreInterface> {
  user$: Observable<User | null>
  profileState$: Observable<ProfileStoreInterface>
  vm$: Observable<{ profileState: ProfileStoreInterface, user: User | null }>

  constructor(private profileService: ProfileService, private store: Store) {
    super({isLoading: false, error: null, validationErrors: [], success: null})
    this.profileState$ = this.select((state) => state);
    this.user$ = this.store.select(selectUser)
    this.vm$ = this.select({
      profileState: this.profileState$,
      user: this.user$
    });
  }

  setIsLoading = this.updater((state, isLoading: boolean) => ({...state, isLoading}));
  setError = this.updater((state, error: string) => ({...state, error}));
  setSuccess = this.updater(((state, success: string) => ({...state, success})))
  setValidationErrors = this.updater((state, validationErrors: ApiValiationsErrorsInterface[]) => ({
    ...state,
    validationErrors
  }))

  upatedProfile = this.effect((payload$: Observable<ProfilePayloadInterface>) => {
    return payload$.pipe(
      tap(() => this.setIsLoading(true)),
      mergeMap((payload) => this.profileService.updateProfile(payload).pipe(
        map((user) => {
          this.setSuccess('Profil mis à jour avec succès')
          return authActions.authenticateUser({user})
        }),
        catchError((error) => {
          const message = error.error.message
          if (typeof message === 'string')
            return of(this.setError(error.error.message))
          return of(this.setValidationErrors(error.error.message))
        })
      )),
      tap(() => this.setIsLoading(false))
    )
  })

  updateImage = this.effect((payload: Observable<FormData>) => {
    return payload.pipe(
      tap(() => this.setIsLoading(true)),
      combineLatestWith(this.user$),
      mergeMap(([payload, user]) => this.profileService.updateImage(user?.id, payload).pipe(
        map(() => this.setSuccess('Image de profil mise à jour avec succès')),
        catchError((err) => of(this.setError(err.error.message)))
      )),
      tap(() => this.setIsLoading(false)),
    )
  })
}

import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {LoginStoreInterface} from "../types/login-store.interface";
import {catchError, map, Observable, of, switchMap, tap} from "rxjs";
import {LoginPayloadInterface} from "../types/login-payload.interface";
import {Router} from "@angular/router";
import {authActions} from "../../../shared/auth/data-access/auth.actions";
import {LoginService} from "./login.service";

@Injectable()
export class LoginStore extends ComponentStore<LoginStoreInterface> {
  vm$: Observable<LoginStoreInterface> = this.select((state) => state)

  constructor(private loginService: LoginService, private router: Router) {
    super({isLoading: false, error: null});
  }

  setLoading = this.updater((state, isLoading: boolean) => ({...state, isLoading}));
  setError = this.updater((state, error: string) => ({...state, error}));

  readonly login = this.effect((payload$: Observable<LoginPayloadInterface>) => {
    return payload$.pipe(
      tap(() => this.setLoading(true)),
      switchMap((payload: LoginPayloadInterface) => this.loginService.login(payload).pipe(
        map((user) => {
          authActions.authenticateUser({user})
          return this.router.navigate(['/profile']);
        }),
        catchError((httpError) => of(this.setError(httpError.error.message))),
      )),
      tap(() => this.setLoading(false)),
    )
  })
}

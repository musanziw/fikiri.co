import { Store } from '@ngrx/store';
import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from './login/login.service';
import * as authActions from './shared/auth/store/auth.actions';
import { AuthStoreInterface } from './shared/auth/types/auth-store.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
  // subscription$: Subscription;

  constructor(
    private loginService: LoginService,
    private store: Store<AuthStoreInterface>
  ) {
    // this.subscription$ = this.loginService.authenticatedUser().subscribe({
    //   next: (res) => {
    //     this.store.dispatch(authActions.authenticationSuccess(res.data));
    //   },
    //   error: () => {
    //     this.store.dispatch(authActions.authenticationFailure());
    //   },
    // });

    this.store.dispatch(authActions.authentication());
  }

  ngOnDestroy(): void {
    // this.subscription$.unsubscribe();
  }
}

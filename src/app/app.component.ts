import { Store } from '@ngrx/store';
import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as authActions from './shared/auth/store/auth.actions';
import { AuthStoreInterface } from './shared/auth/types/auth-store.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {


  constructor(
    private store: Store<AuthStoreInterface>
  ) {
  

    this.store.dispatch(authActions.authentication());
  }


}

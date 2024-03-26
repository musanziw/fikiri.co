import {Store} from '@ngrx/store';
import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthStoreInterface} from './shared/auth/types/auth-store.interface';
import {authActions} from "./shared/auth/store/auth.actions";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AuthStoreInterface>) {
  }

  ngOnInit(): void {
    this.store.dispatch(authActions.authenticatedUser());
  }
}

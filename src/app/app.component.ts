import {Store} from '@ngrx/store';
import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {authActions} from "./shared/auth/store/auth.actions";
import {TopbarComponent} from "./shared/components/topbar/topbar.component";
import {FooterComponent} from "./shared/components/footer/footer.component";
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {LoadingBarHttpClientModule} from "@ngx-loading-bar/http-client";
import {LoadingBarRouterModule} from "@ngx-loading-bar/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TopbarComponent,
    FooterComponent,
    LoadingBarModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(authActions.authenticatedUser());
  }
}

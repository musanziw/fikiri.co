import {Store} from '@ngrx/store';
import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {authActions} from "./auth/store/auth.actions";
import {TopbarComponent} from "./shared/components/topbar/topbar.component";
import {FooterComponent} from "./shared/components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TopbarComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(authActions.authentication());
  }
}

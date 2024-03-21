import { Component } from '@angular/core';
import { Solution } from '../../shared/types/models-interfaces';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SolutionCardComponent } from '../../shared/ui/solution-card/solution-card.component';
import { TopbarComponent } from '../../shared/ui/topbar/topbar.component';
import { FooterComponent } from '../../shared/ui/footer/footer.component';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppStoreInterface } from '../../shared/types/app-store.interface';
import * as solutionsActions from './store/solutions.actions';
import {
  cursorSelector,
  isLoadingSelector,
  solutionsSelector,
} from './store/solutions.selectors';
import { SpinnerComponent } from '../../shared/ui/spinner/spinner.component';
import {SolutionCardSkeletonComponent} from "../../shared/ui/solution-card-skeleton/solution-card-skeleton.component";

@Component({
  selector: 'fk-solutions',
  standalone: true,
  templateUrl: './solutions.component.html',
  imports: [
    CommonModule,
    RouterModule,
    SolutionCardComponent,
    TopbarComponent,
    FooterComponent,
    SpinnerComponent,
    SolutionCardSkeletonComponent,
  ],
})
export class SolutionsComponent {
  solutions$: Observable<Solution[]>;
  isLoading$: Observable<boolean>;
  cursor$: Observable<number>;
  cursor: number = 1;

  constructor(private store: Store<AppStoreInterface>) {
    this.store.dispatch(solutionsActions.load());
    this.solutions$ = this.store.pipe(select(solutionsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.cursor$ = this.store.pipe(select(cursorSelector));
  }

  loadMore() {
    this.store.dispatch(solutionsActions.loadMore());
  }
}

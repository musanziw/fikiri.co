import {Component} from '@angular/core';
import {Solution} from '../../../shared/types/models-interfaces';
import {SolutionCardComponent} from '../../../shared/ui/solution-card/solution-card.component';
import {Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';
import * as winningSolutionsActions from './store/winning-solutions.actions';
import {
  isLoadingSelector,
  solutionsSelector,
} from './store/winning-solutions.selectors';
import {AppStoreInterface} from '../../../shared/types/app-store.interface';
import {CommonModule} from '@angular/common';
import {
  SolutionCardSkeletonComponent
} from "../../../shared/ui/solution-card-skeleton/solution-card-skeleton.component";

@Component({
  selector: 'ui-winning-solutions',
  standalone: true,
  imports: [SolutionCardComponent, CommonModule, SolutionCardSkeletonComponent],
  templateUrl: './winnging-solutions.component.html',
})
export class WinningSolutionsComponent {
  solutions$: Observable<Solution[]>;
  isLoading$: Observable<boolean>;

  constructor(private store: Store<AppStoreInterface>) {
    this.store.dispatch(winningSolutionsActions.load());
    this.solutions$ = this.store.pipe(select(solutionsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }
}

import {Component, OnInit} from '@angular/core';
import {CommonModule, NgComponentOutlet} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SolutionCardComponent} from '../../shared/ui/solution-card/solution-card.component';
import {TopbarComponent} from '../../shared/ui/topbar/topbar.component';
import {FooterComponent} from '../../shared/ui/footer/footer.component';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppStoreInterface} from '../../shared/types/app-store.interface';
import {SpinnerComponent} from '../../shared/ui/spinner/spinner.component';
import {SolutionCardSkeletonComponent} from '../../shared/ui/solution-card-skeleton/solution-card-skeleton.component';
import {solutionsActions} from "./store/solutions.actions";
import {SolutionsStoreInterface} from "./types/solutions-store.interface";
import {selectSolutionsState} from "./store/solutions.reducers";

@Component({
  selector: 'fk-solutions-list',
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
    NgComponentOutlet,
  ],
})
export class SolutionsComponent implements OnInit {
  state$: Observable<SolutionsStoreInterface>;


  constructor(private store: Store<AppStoreInterface>) {
    this.state$ = this.store.pipe(select(selectSolutionsState));
  }

  ngOnInit(): void {
    this.store.dispatch(solutionsActions.load());
  }

  loadMore(cursor: number) {
    this.store.dispatch(solutionsActions.loadMore({cursor}));
  }
}

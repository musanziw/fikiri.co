import {Component, OnInit} from '@angular/core';
import {SolutionCardComponent} from '../../../shared/components/solution-card/solution-card.component';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppStoreInterface} from '../../../shared/types/app-store.interface';
import {CommonModule} from '@angular/common';
import {
  SolutionCardSkeletonComponent
} from '../../../shared/components/solution-card-skeleton/solution-card-skeleton.component';
import {WinningSolutionsStoreInterface} from "./types/winning-solutions-store.interface";
import {selectWinningSolutionsState} from "./store/winning-solutions.reducers";
import {winningSolutionsActions} from "./store/winning-solutions.actions";

@Component({
  selector: 'component-winning-solutions',
  standalone: true,
  imports: [SolutionCardComponent, CommonModule, SolutionCardSkeletonComponent],
  templateUrl: './winnging-solutions.component.html',
})
export class WinningSolutionsComponent implements OnInit {
  states$: Observable<WinningSolutionsStoreInterface>

  constructor(private store: Store<AppStoreInterface>) {
    this.states$ = this.store.pipe(select(selectWinningSolutionsState));
  }

  ngOnInit(): void {
    this.store.dispatch(winningSolutionsActions.load());
  }
}

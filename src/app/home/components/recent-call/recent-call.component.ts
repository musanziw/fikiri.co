import {Component, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe, NgIf, NgOptimizedImage} from '@angular/common';
import {CapitalizeFirstLetterPipe} from '../../../shared/pipes/capitalizeFirstLetter.pipe';
import {NotFoundComponent} from '../../../shared/components/not-found/not-found.component';
import {Observable} from 'rxjs';
import {RecentCallStoreInterface} from './types/recent-call-store.interface';
import {Store} from '@ngrx/store';
import {selectRecentCallState} from './store/recent-call.reducers';
import {recentCallActions} from './store/recent-call.actions';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'component-recent-call',
  standalone: true,
  imports: [
    AsyncPipe,
    CapitalizeFirstLetterPipe,
    NgIf,
    NgOptimizedImage,
    NotFoundComponent,
    RouterLink,
    DatePipe,
  ],
  templateUrl: './recent-call.component.html',
})
export class RecentCallComponent implements OnInit {
  state$: Observable<RecentCallStoreInterface>;

  constructor(private store: Store) {
    this.state$ = this.store.select(selectRecentCallState);
  }

  ngOnInit(): void {
    this.store.dispatch(recentCallActions.load());
  }
}

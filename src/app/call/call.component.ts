import {Component, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe, NgIf, NgOptimizedImage} from '@angular/common';
import {CapitalizeFirstLetterPipe} from '../shared/pipes/capitalizeFirstLetter.pipe';
import {NotFoundComponent} from '../shared/components/not-found/not-found.component';
import {Observable} from 'rxjs';
import {CallStoreInterface} from './types/call-store.interface';
import {Store} from '@ngrx/store';
import {selectCallState} from './store/call.reducers';
import {callActions} from './store/call.actions';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {solutionActions} from '../solutions/solution-details/store/solution.actions';
import {YouTubePlayer} from "@angular/youtube-player";

@Component({
  selector: 'app-call',
  standalone: true,
  imports: [
    AsyncPipe,
    CapitalizeFirstLetterPipe,
    NgIf,
    NgOptimizedImage,
    NotFoundComponent,
    RouterLink,
    DatePipe,
    YouTubePlayer,
  ],
  templateUrl: './call.component.html',
})
export class CallComponent implements OnInit {
  state$: Observable<CallStoreInterface>;

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
    this.state$ = this.store.select(selectCallState);
  }

  ngOnInit() {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(callActions.load({id}));
  }

  loadPrevOrNext(id: number | null | undefined): void {
    if (!id) return;
    this.store.dispatch(solutionActions.load({id}));
    this.router.navigate(['/call', id]);
  }
}

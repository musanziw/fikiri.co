import {Injectable, OnDestroy} from '@angular/core';
import {Solution} from '../../shared/types/models-interfaces';
import {HttpClientService} from '../../shared/services/http-client.service';
import {select, Store} from '@ngrx/store';
import {AppStoreInterface} from '../../shared/types/app-store.interface';
import {cursorSelector} from './store/solutions.selectors';
import {Observable, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SolutionsService implements OnDestroy {
  cursor!: number;
  subscription$: Subscription

  constructor(private http: HttpClientService, private store: Store<AppStoreInterface>) {
    this.subscription$ = this.store.pipe(select(cursorSelector)).subscribe((res) => {
      this.cursor = res;
    });
  }

  getMappedSolutions(): Observable<{ data: Solution[] }> {
    return this.http.get<Solution[]>(
      `solutions/mapped/all?cursor=${this.cursor}`
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe()
  }
}


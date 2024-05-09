import { Component, OnInit } from '@angular/core';
import { CallsStore } from './data-access/events.store';
import { Observable } from 'rxjs';
import { CallsStoreInterface } from './types/events-store.interface';
import { AsyncPipe, DatePipe, NgClass, NgForOf, NgIf, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-calls',
  standalone: true,
  imports: [NgIf, AsyncPipe, SlicePipe, DatePipe, NgClass, NgForOf],
  providers: [CallsStore],
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {
  vm$: Observable<CallsStoreInterface>;

  constructor(private store: CallsStore) {
    this.vm$ = this.store.vm$;
  }

  ngOnInit(): void {
    this.store.getCalls();
  }

  isActive(ended_at: Date): boolean {
    const current = new Date();
    const end = new Date(ended_at);
    return current > end;
  }
}

import {Component, OnInit} from '@angular/core';
import {CallsStore} from "./data-access/calls.store";
import {Observable} from "rxjs";
import {CallsStoreInterface} from "./types/calls-store.interface";
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {CarouselModule, OwlOptions} from "ngx-owl-carousel-o";

@Component({
  selector: 'component-calls',
  standalone: true,
  imports: [NgIf, AsyncPipe, CarouselModule, SlicePipe, DatePipe, NgClass, NgForOf],
  providers: [CallsStore],
  templateUrl: './calls.component.html',
})
export class CallsComponent implements OnInit {
  vm$: Observable<CallsStoreInterface>;

  constructor(private store: CallsStore) {
    this.vm$ = this.store.vm$;
  }

  ngOnInit(): void {
    this.store.getCalls();
  }

  // Define if the call is active, passed or future
  isActive(ended_at: Date): boolean {
    const current = new Date();
    const end = new Date(ended_at);
    return current > end
  }
}

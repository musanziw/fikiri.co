import { Component, OnInit } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SolutionCardComponent } from '../shared/components/solution-card/solution-card.component';
import { Observable } from 'rxjs';
import { SpinnerComponent } from '../shared/ui/spinner/spinner.component';
import { SolutionCardSkeletonComponent } from '../shared/components/solution-card-skeleton/solution-card-skeleton.component';
import { SolutionsStoreInterface } from './types/solutions-store.interface';
import { SolutionsStore } from './data-access/solutions.store';

@Component({
  selector: 'app-solutions',
  standalone: true,
  templateUrl: './solutions.component.html',
  providers: [SolutionsStore],
  imports: [
    CommonModule,
    RouterModule,
    SolutionCardComponent,
    SpinnerComponent,
    SolutionCardSkeletonComponent,
    NgComponentOutlet,
  ],
})
export class SolutionsComponent implements OnInit {
  vm$: Observable<SolutionsStoreInterface>;

  constructor(private store: SolutionsStore) {
    this.vm$ = this.store.vm$;
  }

  ngOnInit(): void {
    this.store.load();
  }

  loadMore(): void {
    this.store.loadMore();
  }
}

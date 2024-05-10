import { Component, OnInit } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SolutionCardComponent } from '../shared/components/solution-card/solution-card.component';
import { Observable } from 'rxjs';
import { SpinnerComponent } from '../shared/ui/spinner/spinner.component';
import { SolutionCardSkeletonComponent } from '../shared/components/solution-card-skeleton/solution-card-skeleton.component';
import { SolutionsStoreInterface } from './types/solutions-store.interface';
import { SolutionsStore } from './data-access/solutions.store';
import { NgxPaginationModule } from 'ngx-pagination';

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
    NgxPaginationModule
  ]
})
export class SolutionsComponent implements OnInit {
  vm$: Observable<SolutionsStoreInterface>;
  currentPage: number;

  constructor(
    private store: SolutionsStore,
    private router: Router
  ) {
    this.vm$ = this.store.vm$;
    this.currentPage = Number(this.router.parseUrl(this.router.url).queryParamMap.get('page')) || 1;
  }

  ngOnInit(): void {
    this.store.load(this.currentPage);
  }

  onPageChange(page: number) {
    this.router.navigate(['solutions'], { queryParams: { page } });
    this.store.load(page);
    this.currentPage = page;
    window.scrollTo({ top: 0 });
  }
}

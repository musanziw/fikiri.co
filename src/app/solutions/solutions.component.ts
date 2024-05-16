import { Component, OnInit } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { SolutionCardComponent } from '../shared/components/solution-card/solution-card.component';
import { Observable } from 'rxjs';
import { SpinnerComponent } from '../shared/ui/spinner/spinner.component';
import { SolutionCardSkeletonComponent } from '../shared/components/solution-card-skeleton/solution-card-skeleton.component';
import { SolutionsStoreInterface } from './types/solutions-store.interface';
import { SolutionsStore } from './data-access/solutions.store';
import { NgxPaginationModule } from 'ngx-pagination';
import { QueryParams } from './types/query-params.interface';
import { InputComponent } from '../shared/ui/input/input.component';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { RouterLink } from '@angular/router';
import { SafeHtmlPipe } from '../shared/pipes/safe-html.pipe';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-solutions',
  standalone: true,
  templateUrl: './solutions.component.html',
  providers: [SolutionsStore],
  imports: [
    RouterLink,
    CommonModule,
    SolutionCardComponent,
    SpinnerComponent,
    SolutionCardSkeletonComponent,
    NgComponentOutlet,
    NgxPaginationModule,
    InputComponent,
    ButtonComponent,
    SafeHtmlPipe,
    NgSelectModule
  ]
})
export class SolutionsComponent implements OnInit {
  vm$: Observable<SolutionsStoreInterface>;
  isFocused = false;
  queryParams: QueryParams = { page: null, event: null, thematic: null };
  constructor(private store: SolutionsStore) {
    this.vm$ = this.store.vm$;
  }

  ngOnInit(): void {
    this.store.getEvents();
    this.store.getSolutions(this.queryParams);
  }

  loadFilteredSolutions(key: string, value: number): void {
    if (key !== 'page') {
      this.queryParams = { ...this.queryParams, page: 1 };
    }
    this.queryParams = { ...this.queryParams, [key]: value };
    this.store.getSolutions(this.queryParams);
  }

  onPageChange(page: number): void {
    this.loadFilteredSolutions('page', page);
    window.scrollTo({ top: 0 });
  }

  onThematicChange(e: Event): void {
    this.loadFilteredSolutions('thematic', +e);
  }

  onEventChange(e: Event): void {
    this.store.getThematics(+e);
    this.loadFilteredSolutions('event', +e);
  }

  onSearch(query: string): void {
    this.store.searchSolutions(query);
  }
}

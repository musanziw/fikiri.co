import { Component, OnInit } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { RouterModule } from '@angular/router';
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
    NgxPaginationModule,
    InputComponent,
    ButtonComponent
  ]
})
export class SolutionsComponent implements OnInit {
  vm$: Observable<SolutionsStoreInterface>;
  queryParams: QueryParams = { page: null, event: null, odd: null, thematic: null };
  sdgs: string[] = [
    'Pas de pauvreté',
    'Faim zéro',
    'Bonne santé et bien-être',
    'Éducation de qualité',
    'Égalité entre les sexes',
    'Eau propre et assainissement',
    "Énergie propre et d'un coût abordable",
    'Travail décent et croissance économique',
    'Industrie, innovation et infrastructure',
    'Réduction des inégalités',
    'Villes et communautés durables',
    'Consommation et production responsables',
    'Lutte contre les changements climatiques',
    'Vie aquatique',
    'Vie terrestre',
    'Paix, justice et institutions efficaces',
    'Partenariats pour la réalisation des objectifs'
  ];

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

  onOddChange(odd: number): void {
    this.loadFilteredSolutions('odd', odd);
  }

  onThematicChange(thematic: number): void {
    this.loadFilteredSolutions('thematic', thematic);
  }

  onEventChange(event: number): void {
    this.store.getThematics(event);
    this.loadFilteredSolutions('event', event);
  }
}

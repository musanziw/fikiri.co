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
import { Solution } from '../shared/types/models-interfaces';

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
  queryParams: { sdg: string; thematic: string; page: number } = {
    sdg: '',
    thematic: '',
    page: 1
  };
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

  constructor(
    private store: SolutionsStore,
    private router: Router
  ) {
    this.vm$ = this.store.vm$;
    this.queryParams = {
      page: Number(this.router.parseUrl(this.router.url).queryParamMap.get('page')) || 1,
      sdg: this.router.parseUrl(this.router.url).queryParamMap.get('sdg') || '',
      thematic: this.router.parseUrl(this.router.url).queryParamMap.get('thematic') || ''
    };
  }

  ngOnInit(): void {
    this.store.getThematics();
    this.store.getSolutions(this.queryParams.page);
  }

  setQueryParams(key: string, value: string | number) {
    this.queryParams = { ...this.queryParams, [key]: value };
    this.router.navigate(['solutions'], { queryParams: this.queryParams });
  }

  onPageChange(value: number) {
    this.setQueryParams('page', value);
    this.store.getSolutions(value);
    window.scrollTo({ top: 0 });
  }

  onSdgChange(value: string): void {
    this.setQueryParams('sdg', value);
  }

  onThematicChange(thematic: string): void {
    this.setQueryParams('thematic', thematic);
  }

  filterSolutions(Solutions: Solution[]): Solution[] {
    return Solutions.filter((solution) => {
      const { sdg, thematic } = this.queryParams;
      return (!sdg || solution.thematic.odds.includes(sdg)) && (!thematic || solution.thematic.name === thematic);
    });
  }
}

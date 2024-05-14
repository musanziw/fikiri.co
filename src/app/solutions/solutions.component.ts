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
  queryParams: QueryParams = { page: null, event: null, odd: null, thematic: null, name: null };
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
    const page = Number(this.router.parseUrl(this.router.url).queryParamMap.get('page'));
    const event = Number(this.router.parseUrl(this.router.url).queryParamMap.get('event'));
    const odd = Number(this.router.parseUrl(this.router.url).queryParamMap.get('odd'));
    const thematic = Number(this.router.parseUrl(this.router.url).queryParamMap.get('thematic'));
    const name = this.router.parseUrl(this.router.url).queryParamMap.get('name');
    if (page) this.queryParams.page = page;
    if (event) this.queryParams.event = event;
    if (odd) this.queryParams.odd = odd;
    if (thematic) this.queryParams.thematic = thematic;
    if (name) this.queryParams.name = name;
  }

  ngOnInit(): void {
    this.store.getEvents();
    this.store.getSolutions(this.queryParams);
  }

  onPageChange(page: number): void {
    this.queryParams.page = page;
    this.store.getSolutions(this.queryParams);
    window.scrollTo({ top: 0 });
    this.router.navigate(['/solutions'], { queryParams: this.queryParams });
  }

  onOddChange(odd: number): void {
    this.queryParams.odd = odd;
    this.store.getSolutions(this.queryParams);
    this.router.navigate(['/solutions'], { queryParams: this.queryParams });
  }

  onThematicChange(thematic: number): void {
    this.queryParams.thematic = thematic;
    this.store.getSolutions(this.queryParams);
    this.router.navigate(['/solutions'], { queryParams: this.queryParams });
  }

  onEventChange(event: number): void {
    this.queryParams.event = event;
    this.store.getThematics(event);
    this.store.getSolutions(this.queryParams);
    this.router.navigate(['/solutions'], { queryParams: this.queryParams });
  }
}

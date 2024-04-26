import { Component, OnInit } from '@angular/core';
import { Solution } from '../shared/types/models-interfaces';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { SolutionStoreInterface } from './types/solution-store.interface';
import { NotFoundComponent } from '../not-found/not-found.component';
import { SolutionStore } from './data-access/solution.store';
import { SolutionService } from './data-access/solution.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-solution',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, RouterLink, NotFoundComponent],
  providers: [SolutionService, SolutionStore],
  templateUrl: './solution.component.html'
})
export class SolutionComponent implements OnInit {
  vm$: Observable<SolutionStoreInterface>;

  constructor(
    private store: SolutionStore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.vm$ = this.store.vm$;
  }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.store.getSolution(id);
  }

  displayImage(solution: Solution): string {
    return `${environment.apiUrl}/uploads/${solution.images.at(-1)?.image_link}`;
  }

  load(id: number | null): void {
    if (!id) return;
    this.router.navigate(['/solutions', id]);
    this.store.getSolution(id);
  }
}

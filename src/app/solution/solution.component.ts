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
import { SpinnerComponent } from '../shared/ui/spinner/spinner.component';

@Component({
  selector: 'app-solution',
  standalone: true,
  providers: [SolutionService, SolutionStore],
  templateUrl: './solution.component.html',
  imports: [NgOptimizedImage, CommonModule, RouterLink, NotFoundComponent, SpinnerComponent]
})
export class SolutionComponent implements OnInit {
  vm$: Observable<SolutionStoreInterface>;
  currentImageIndex: number = -1;

  constructor(
    private store: SolutionStore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.vm$ = this.store.vm$;
  }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.load(id);
  }

  displayImage(solution: Solution): string {
    return `${environment.apiUrl}/uploads/${solution.images.at(this.currentImageIndex)?.image_link}`;
  }

  displayNextImage(solution: Solution): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % solution.images.length;
  }

  load(id: number): void {
    this.router.navigate(['/solutions', id]);
    this.store.getSolution(id);
    this.currentImageIndex = -1;
  }
}

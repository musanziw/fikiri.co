import { Component, OnInit } from '@angular/core';
import { Image, Solution } from '../shared/types/models-interfaces';
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
  currentImageIndex: number = 0;

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

  displayImage(image: Image): string {
    return `${environment.apiUrl}uploads/solutions/${image.image_link}`;
  }

  nextImage(images: Image[]): void {
    if (this.currentImageIndex < images.length - 1) this.currentImageIndex++;
  }

  prevImage(): void {
    if (this.currentImageIndex > 0) this.currentImageIndex--;
  }

  isFirstImage(): boolean {
    return this.currentImageIndex === 0;
  }

  isLastImage(images: Image[]): boolean {
    return this.currentImageIndex === images.length - 1;
  }

  load(id: number): void {
    this.router.navigate(['/solutions', id]);
    this.store.getSolution(id);
  }

  convertKeyToLowercase(key: string, solution: Solution): string {
    const value = solution[key as keyof Solution] as string;
    const valueArray = value.split(' ');
    return valueArray.map((word) => word.toLowerCase()).join(' ');
  }
}

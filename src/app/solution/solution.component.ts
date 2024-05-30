import { Component, OnInit } from '@angular/core';
import { Image, User } from '../shared/types/models-interfaces';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { SolutionStoreInterface } from './types/solution-store.interface';
import { NotFoundComponent } from '../not-found/not-found.component';
import { SolutionStore } from './data-access/solution.store';
import { SolutionService } from './data-access/solution.service';
import { environment } from '../../environments/environment';
import { SpinnerComponent } from '../shared/ui/spinner/spinner.component';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { ConvertToLowercasePipe } from '../shared/pipes/convert-to-lowercase.pipe';

@Component({
  selector: 'app-solution',
  standalone: true,
  providers: [SolutionService, SolutionStore],
  templateUrl: './solution.component.html',
  imports: [
    NgOptimizedImage,
    CommonModule,
    RouterLink,
    NotFoundComponent,
    SpinnerComponent,
    PaginationComponent,
    ConvertToLowercasePipe
  ]
})
export class SolutionComponent implements OnInit {
  vm$: Observable<{ solutionStore: SolutionStoreInterface; user: User | null }>;
  currentImageIndex: number = 0;

  constructor(private store: SolutionStore, private route: ActivatedRoute, private router: Router) {
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

  load(id: number | undefined | null): void {
    if (!id) return;
    this.router.navigate(['/solutions', id]);
    this.store.getSolution(id);
  }

  onImageChange(event: Event, solutionId: number): void {
    const fileInput: HTMLInputElement = event.target as HTMLInputElement;
    const file: File | undefined = fileInput.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('thumb', file);
      this.store.uploadImage({ file: formData, solutionId });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { eventsStore } from './data-access/events.store';
import { Observable } from 'rxjs';
import { EventsStoreInterface } from './types/events-store.interface';
import { AsyncPipe, DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage, SlicePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { Image } from '../../../shared/types/models-interfaces';

@Component({
  selector: 'app-calls',
  standalone: true,
  imports: [NgIf, AsyncPipe, SlicePipe, NgForOf, DatePipe, NgClass, NgOptimizedImage],
  providers: [eventsStore],
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {
  currentImageIndex = 0;
  vm$: Observable<EventsStoreInterface>;

  constructor(private store: eventsStore) {
    this.vm$ = this.store.vm$;
  }

  ngOnInit(): void {
    this.store.getEvents();
  }

  displayImage(image: Image): string {
    return `${environment.apiUrl}uploads/events/${image.image_link}`;
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
}

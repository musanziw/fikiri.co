import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { HeroStore } from './data-access/hero.store';
import { Observable } from 'rxjs';
import { HeroStoreInterfce } from './types/hero-store.interfce';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, NgIf, AsyncPipe],
  providers: [HeroStore],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit {
  vm$: Observable<HeroStoreInterfce>;

  constructor(private store: HeroStore) {
    this.vm$ = this.store.vm$;
  }

  ngOnInit(): void {
    this.store.getTotals();
  }
}

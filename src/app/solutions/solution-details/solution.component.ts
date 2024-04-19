import {Component, OnInit} from '@angular/core';
import {Solution} from '../../shared/types/models-interfaces';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ImagesService} from '../../shared/services/images.service';
import {Observable} from 'rxjs';
import {SolutionStoreInterface} from "./types/solution-store.interface";
import {NotFoundComponent} from "../../shared/components/not-found/not-found.component";
import {SolutionStore} from "./data-access/solution.store";
import {SolutionService} from "./data-access/solution.service";

@Component({
  selector: 'fk-solution-details-details',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, RouterLink, NotFoundComponent],
  providers: [SolutionService, SolutionStore],
  templateUrl: './solution.component.html',
})
export class SolutionComponent implements OnInit {
  vm$: Observable<SolutionStoreInterface>;

  constructor(private store: SolutionStore, private imagesService: ImagesService, private route: ActivatedRoute) {
    this.vm$ = this.store.vm$
  }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.store.getSolution(id);
  }

  displayImage(solution: Solution): string {
    return this.imagesService.diplayImage(solution);
  }
}

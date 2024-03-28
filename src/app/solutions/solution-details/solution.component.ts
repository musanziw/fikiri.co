import {Component, OnInit} from '@angular/core';
import {Solution} from '../../shared/types/models-interfaces';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ImagesService} from '../../shared/services/images.service';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppStoreInterface} from '../../shared/types/app-store.interface';
import {SolutionStoreInterface} from "./types/solution-store.interface";
import {selectSolutionState} from "./store/solution.reducers";
import {CapitalizeFirstLetterPipe} from "../../shared/pipes/capitalize-first-letter.pipe";
import {solutionActions} from "./store/solution.actions";
import {NotFoundComponent} from "../../shared/components/not-found/not-found.component";
import {cutParagraph} from "../../shared/pipes/cut-paragraph.pipe";

@Component({
  selector: 'fk-solution-details-details',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CommonModule,
    CapitalizeFirstLetterPipe,
    RouterLink,
    NotFoundComponent,
    cutParagraph
  ],
  templateUrl: './solution.component.html',
})
export class SolutionComponent implements OnInit {
  state$: Observable<SolutionStoreInterface>;

  constructor(
    private store: Store<AppStoreInterface>,
    private imagesService: ImagesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.state$ = this.store.pipe(select(selectSolutionState));
  }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(solutionActions.load({id}));
  }

  displayImage(solution: Solution): string {
    return this.imagesService.diplayImage(solution);
  }

  loadPrevOrNext(id: number | null): void {
    if (!id) return
    this.store.dispatch(solutionActions.load({id}));
    this.router.navigate(['/solutions', id])
  }
}

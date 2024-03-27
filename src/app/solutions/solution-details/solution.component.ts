import {Component, OnInit} from '@angular/core';
import {Solution} from '../../shared/types/models-interfaces';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ImagesService} from '../../shared/services/images.service';
import {FooterComponent} from '../../shared/components/footer/footer.component';
import {TopbarComponent} from '../../shared/components/topbar/topbar.component';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppStoreInterface} from '../../shared/types/app-store.interface';
import {SolutionStoreInterface} from "./types/solution-store.interface";
import {selectSolutionState} from "./store/solution.reducers";
import {CapitalizeFirstLetterPipe} from "../../shared/pipes/capitalize-first-letter.pipe";
import {solutionActions} from "./store/solution.actions";

@Component({
  selector: 'fk-solution-details-details',
  standalone: true,
  imports: [NgOptimizedImage, FooterComponent, TopbarComponent, CommonModule, CapitalizeFirstLetterPipe, RouterLink],
  templateUrl: './solution.component.html',
})
export class SolutionComponent implements OnInit {
  state$: Observable<SolutionStoreInterface>;

  constructor(private store: Store<AppStoreInterface>, private imagesService: ImagesService, private route: ActivatedRoute,) {
    this.state$ = this.store.pipe(select(selectSolutionState));
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(solutionActions.load({id}));
  }

  displayImage(solution: Solution): string {
    return this.imagesService.diplayImage(solution);
  }
}

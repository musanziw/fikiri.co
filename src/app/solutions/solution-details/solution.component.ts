import {Component, OnInit} from '@angular/core';
import {Solution} from '../../shared/types/models-interfaces';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ImagesService} from '../../shared/services/images.service';
import {FooterComponent} from '../../shared/components/footer/footer.component';
import {TopbarComponent} from '../../shared/components/topbar/topbar.component';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppStoreInterface} from '../../shared/types/app-store.interface';
import {solutionActions} from "./store/solution.actions";
import {SolutionStoreInterface} from "./types/solution-store.interface";
import {selectSolutionState} from "./store/solution.reducers";
import {CapitalizeFirstLetterPipe} from "../../shared/pipes/capitalize-first-letter.pipe";

@Component({
  selector: 'fk-solution-details-details',
  standalone: true,
  imports: [NgOptimizedImage, FooterComponent, TopbarComponent, CommonModule, CapitalizeFirstLetterPipe],
  templateUrl: './solution.component.html',
})
export class SolutionComponent implements OnInit {
  state$: Observable<SolutionStoreInterface>;

  constructor(
    private store: Store<AppStoreInterface>,
    private imagesService: ImagesService,
    private route: ActivatedRoute,
  ) {
    this.state$ = this.store.pipe(select(selectSolutionState));
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
        this.store.dispatch(solutionActions.load({id: +params['id']}));
      }
    )
  }

  displayImage(solution: Solution): string {
    return this.imagesService.diplayImage(solution);
  }

}

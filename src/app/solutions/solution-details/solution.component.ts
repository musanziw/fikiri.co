import { Component, OnInit } from '@angular/core';
import { Solution } from '../../shared/types/models-interfaces';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StringsService } from '../../shared/services/strings.service';
import { ImagesService } from '../../shared/services/images.service';
import { FooterComponent } from '../../shared/ui/footer/footer.component';
import { TopbarComponent } from '../../shared/ui/topbar/topbar.component';
import { Store, select } from '@ngrx/store';
import { SolutionService } from './solution.service';
import { Observable } from 'rxjs';
import { AppStoreInterface } from '../../shared/types/app-store.interface';
import {solutionActions} from "./store/solution.actions";
import {SolutionStoreInterface} from "./types/solution-store.interface";
import {selectSolutionState} from "./store/solution.reducers";

@Component({
  selector: 'fk-solution-details-details',
  standalone: true,
  imports: [NgOptimizedImage, FooterComponent, TopbarComponent, CommonModule],
  templateUrl: './solution.component.html',
})
export class SolutionComponent implements OnInit {
  state$: Observable<SolutionStoreInterface>;

  constructor(
    private store: Store<AppStoreInterface>,
    private stringsService: StringsService,
    private imagesService: ImagesService,
    private route: ActivatedRoute,
    private solutionService: SolutionService
  ) {
    this.state$ = this.store.pipe(select(selectSolutionState));
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) return;
      this.solutionService.getSolution(+id).subscribe((res) => {
        this.store.dispatch(
          solutionActions.loadSuccess({ solution: res.data })
        );
      });
    });
  }

  displayImage(solution: Solution): string {
    return this.imagesService.diplayImage(solution);
  }

  capitalizeFirstLetter(word: string): string {
    return this.stringsService.capitalizeFirsteLetter(word);
  }
}

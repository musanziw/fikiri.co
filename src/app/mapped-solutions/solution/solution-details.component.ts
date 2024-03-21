import {Component, inject, OnInit} from '@angular/core';
import {Solution} from '../../shared/types/models-interfaces';
import {NgOptimizedImage} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {StringsService} from '../../shared/services/strings.service';
import {ImagesService} from '../../shared/services/images.service';
import {SolutionsService} from './solutions-details.service';
import {FooterComponent} from '../../shared/ui/footer/footer.component';
import {TopbarComponent} from '../../shared/ui/topbar/topbar.component';

@Component({
  selector: 'fk-solution-details',
  standalone: true,
  imports: [NgOptimizedImage, FooterComponent, TopbarComponent],
  templateUrl: './solution-details.component.html',
})
export class SolutionDetailsComponent implements OnInit {
  solution!: Solution | null;
  solutionsService = inject(SolutionsService);
  route = inject(ActivatedRoute);
  stringService = inject(StringsService);
  imageService = inject(ImagesService);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.solutionsService.getSolution(id).subscribe((response) => {
        this.solution = response.data;
      });
    });
  }

  displayImage(solution: Solution) {
    return this.imageService.diplayImage(solution);
  }

  capitalizeFirstLetter(word: string) {
    return this.stringService.capitalizeFirsteLetter(word);
  }
}

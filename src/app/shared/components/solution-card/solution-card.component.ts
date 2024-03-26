import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Solution} from '../../types/models-interfaces';
import {ImagesService} from '../../services/images.service';
import {cutParagraph} from "../../pipes/cut-paragraph.pipe";
import {CapitalizeFirstLetterPipe} from "../../pipes/capitalize-first-letter.pipe";

@Component({
  selector: 'component-solution-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, cutParagraph, CapitalizeFirstLetterPipe],
  templateUrl: './solution-card.component.html',
})
export class SolutionCardComponent {
  @Input() solution!: Solution;

  constructor(
    private imageService: ImagesService,
  ) {
  }

  displayImage(solution: Solution) {
    return this.imageService.diplayImage(solution);
  }
}

import {Component, Input} from '@angular/core';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Solution, User} from '../../types/models-interfaces';
import {ImagesService} from '../../services/images.service';
import {cutParagraph} from "../../pipes/cutParagraph.pipe";
import {CapitalizeFirstLetterPipe} from "../../pipes/capitalizeFirstLetter.pipe";

@Component({
  selector: 'component-solution-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, cutParagraph, CapitalizeFirstLetterPipe, DatePipe],
  templateUrl: './solution-card.component.html',
})
export class SolutionCardComponent {
  @Input() solution!: Solution;

  constructor(private imageService: ImagesService) {
  }

  displayImage(solution: Solution): string {
    return this.imageService.diplayImage(solution);
  }

  username(user: User | null): string {
    if (!user) return ''
    return user.name.slice(0, 2).toUpperCase()
  }
}

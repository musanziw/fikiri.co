import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Solution} from "../../types/models-interfaces";
import {ImagesService} from "../../services/images.service";
import {StringsService} from "../../services/strings.service";

@Component({
  selector: 'ui-solution-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './solution-card.component.html',
})
export class SolutionCardComponent {
  @Input() solution!: Solution;

  constructor(private imageService: ImagesService, private stringService: StringsService) {
  }

  displayImage(solution: Solution) {
    return this.imageService.diplayImage(solution)
  }

  capitalizeFirsteLetter(word: string) {
    return this.stringService.capitalizeFirsteLetter(word);
  }

  sliceWord(word: string, length: number, limit: number) {
    return this.stringService.sliceWord(word, length, limit);
  }
}



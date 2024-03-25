import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Solution } from '../../types/models-interfaces';
import { ImagesService } from '../../services/images.service';
import { StringsService } from '../../services/strings.service';

@Component({
  selector: 'ui-solution-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './solution-card.component.html',
})
export class SolutionCardComponent {
  @Input() solution!: Solution;

  constructor(
    private imageService: ImagesService,
    private stringService: StringsService
  ) {}

  displayImage(solution: Solution) {
    return this.imageService.diplayImage(solution);
  }

  capitalizeFirsteLetter(word: string) {
    return this.stringService.capitalizeFirsteLetter(word);
  }

  sliceWord(word: string, length: number, limit: number) {
    return this.stringService.sliceWord(word, length, limit);
  }

  cutParagraph(paragraph: string, paragraphLength: number): string[] {
    const words = paragraph.split(' ');
    const result: string[] = [];
    let currentLine = '';

    for (const word of words) {
      if ((currentLine + word).length <= paragraphLength) {
        currentLine += word + ' ';
      } else {
        result.push(currentLine.trim());
        currentLine = word + ' ';
      }
    }

    if (currentLine.trim() !== '') {
      result.push(currentLine.trim());
    }

    return result;
  }
}

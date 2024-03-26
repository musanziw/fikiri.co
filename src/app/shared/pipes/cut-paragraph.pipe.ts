import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'cutParagraph',
  standalone: true
})
export class cutParagraph implements PipeTransform {
  transform(paragraph: string, limit: number): string {
    if (paragraph.length > limit) {
      return paragraph.slice(0, limit) + '...';
    }
    return paragraph;
  }
}

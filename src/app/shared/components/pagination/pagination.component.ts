import { NgClass } from '@angular/common';
import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgClass],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  @Input()
  disablePrev: boolean | undefined = false;

  @Input()
  disableNext: boolean | undefined = false;

  @Input()
  type: 'default' | 'withLabel' = 'default';

  handlePrevClick = output<void>();
  handleNexClick = output<void>();

  onPrevClick(): void {
    this.handlePrevClick.emit();
  }

  onNextClick(): void {
    this.handleNexClick.emit();
  }
}

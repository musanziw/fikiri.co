import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'ui-form-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-card.component.html',
})
export class FormCardComponent {
  @Input() formTitle!: string;
}

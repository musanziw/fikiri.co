import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-card',
  standalone: true,
  templateUrl: './form-card.component.html',
  imports: [CommonModule]
})
export class FormCardComponent {
  @Input() formTitle: string = '';
}

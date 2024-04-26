import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgClass],
  templateUrl: './message.component.html'
})
export class MessageComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | null = null;
}

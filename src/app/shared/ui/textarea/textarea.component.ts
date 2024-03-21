import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html'
})
export class TextareaComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'submit'
  @Input() loading: boolean = false
}

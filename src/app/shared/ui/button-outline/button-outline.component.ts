import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SpinnerComponent} from "../spinner/spinner.component";

@Component({
  selector: 'ui-button-outline',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './button-outline.component.html'
})
export class ButtonOutlineComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'submit'
  @Input() loading: boolean = false
}
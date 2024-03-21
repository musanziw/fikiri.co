import {Component, inject, Input} from "@angular/core";
import {ControlContainer, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'ui-input',
  standalone: true,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true})
    }
  ],
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() name: string = ''
  @Input() label: string = ''
  @Input() type: 'email' | 'password' | 'text' | 'number' = 'text'
  @Input() placeholder: string = ''
  @Input() error: string = ''
}

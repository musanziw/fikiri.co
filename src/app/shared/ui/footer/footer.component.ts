import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ui-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  getYear() {
    return new Date().getFullYear();
  }
}

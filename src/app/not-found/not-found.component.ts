import {Component} from '@angular/core';
import {NotFoundComponent} from "../shared/components/not-found/not-found.component";

@Component({
  selector: 'fk-not-found',
  standalone: true,
  imports: [NotFoundComponent],
  templateUrl: './not-found.component.html'
})
export class FkNotFoundComponent {
}

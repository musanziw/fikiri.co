import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'component-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  @Input() title: string = '404';
  @Input() description: string = 'Page non trouvée';
  @Input() linkText: string = 'Retour à l\'accueil';
  @Input() link: string = '/';
}

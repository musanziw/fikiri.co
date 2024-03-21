import {Component} from '@angular/core';
import {HeroComponent} from './ui/hero/hero.component';
import {AboutComponent} from './ui/about/about.component';
import {TopbarComponent} from '../shared/ui/topbar/topbar.component';
import {FormCardComponent} from '../shared/ui/form-card/form-card.component';
import {FooterComponent} from '../shared/ui/footer/footer.component';
import {WinningSolutionsComponent} from './ui/winning-solutions/winning-solutions.component';

@Component({
  selector: 'fk-home',
  standalone: true,
  imports: [
    HeroComponent,
    WinningSolutionsComponent,
    AboutComponent,
    TopbarComponent,
    FormCardComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
}

import {Component} from '@angular/core';
import {HeroComponent} from './components/hero/hero.component';
import {AboutComponent} from './components/about/about.component';
import {TopbarComponent} from '../shared/components/topbar/topbar.component';
import {FormCardComponent} from '../shared/ui/form-card/form-card.component';
import {FooterComponent} from '../shared/components/footer/footer.component';
import {WinningSolutionsComponent} from './components/winning-solutions/winning-solutions.component';
import {PartnersComponent} from "./components/partners/partners.component";

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
    PartnersComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
}

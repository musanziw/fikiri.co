import {Component} from '@angular/core';
import {HeroComponent} from './components/hero/hero.component';
import {AboutComponent} from './components/about/about.component';
import {WinningSolutionsComponent} from './components/winning-solutions/winning-solutions.component';
import {PartnersComponent} from "./components/partners/partners.component";

@Component({
  selector: 'fk-home',
  standalone: true,
  imports: [
    HeroComponent,
    WinningSolutionsComponent,
    AboutComponent,
    PartnersComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
}

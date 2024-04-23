import {Component} from '@angular/core';
import {HeroComponent} from './components/hero/hero.component';
import {AboutComponent} from './components/about/about.component';
import {WinningSolutionsComponent} from './components/winning-solutions/winning-solutions.component';
import {PartnersComponent} from "./components/partners/partners.component";
import {CallsComponent} from "./components/calls/calls.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, WinningSolutionsComponent, AboutComponent, PartnersComponent, CallsComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
}

import {Component} from '@angular/core';
import {HeroComponent} from './components/hero/hero.component';
import {AboutComponent} from './components/about/about.component';
import {WinningSolutionsComponent} from './components/winning-solutions/winning-solutions.component';
import {CallsComponent} from "./components/calls/calls.component";
import {SdgsComponent} from "./components/sdgs/sdgs.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, WinningSolutionsComponent, AboutComponent, CallsComponent, SdgsComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
}

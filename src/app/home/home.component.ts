import {Component} from '@angular/core';
import {HeroComponent} from './components/hero/hero.component';
import {AboutComponent} from './components/about/about.component';
import {WinningSolutionsComponent} from './components/winning-solutions/winning-solutions.component';
import {CallsComponent} from "./components/calls/calls.component";
import {SdgComponent} from "./components/sdg/sdg.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, WinningSolutionsComponent, AboutComponent, CallsComponent, SdgComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
}

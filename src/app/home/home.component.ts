import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { WinningSolutionsComponent } from './components/winning-solutions/winning-solutions.component';
import { EventsComponent } from './components/events/events.component';
import { SdgsComponent } from './components/sdgs/sdgs.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, WinningSolutionsComponent, AboutComponent, EventsComponent, SdgsComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {}

import { Component } from '@angular/core';
import { HeroComponent } from './ui/hero/hero.component';
import { AboutComponent } from './ui/about/about.component';
import { AwardsSolutionsComponent } from './ui/awards-solutions/awards-solutions.component';
import { TopbarComponent } from '../shared/ui/topbar/topbar.component';
import { FormCardComponent } from '../shared/ui/form-card/form-card.component';
import { FooterComponent } from '../shared/ui/footer/footer.component';

@Component({
  selector: 'fk-home',
  standalone: true,
  imports: [
    HeroComponent,
    AwardsSolutionsComponent,
    AboutComponent,
    TopbarComponent,
    FormCardComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}

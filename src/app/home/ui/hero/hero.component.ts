import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'ui-hero',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './hero.component.html',
})
export class HeroComponent {

}

import { Component } from '@angular/core';
import {FooterComponent} from "../shared/ui/footer/footer.component";
import {SolutionCardComponent} from "../shared/ui/solution-card/solution-card.component";
import {TopbarComponent} from "../shared/ui/topbar/topbar.component";

@Component({
  selector: 'fk-profile',
  standalone: true,
  imports: [
    FooterComponent,
    SolutionCardComponent,
    TopbarComponent
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {

}

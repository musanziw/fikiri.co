import {Component} from '@angular/core';
import {FooterComponent} from "../shared/components/footer/footer.component";
import {SolutionCardComponent} from "../shared/components/solution-card/solution-card.component";
import {TopbarComponent} from "../shared/components/topbar/topbar.component";

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

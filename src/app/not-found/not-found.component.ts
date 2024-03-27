import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {TopbarComponent} from "../shared/components/topbar/topbar.component";
import {FooterComponent} from "../shared/components/footer/footer.component";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    RouterLink,
    TopbarComponent,
    FooterComponent
  ],
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent {

}

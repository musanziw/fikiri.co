import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {TopbarComponent} from "../shared/components/topbar/topbar.component";
import {FooterComponent} from "../shared/components/footer/footer.component";
import {NotFoundComponent} from "../shared/components/not-found/not-found.component";

@Component({
  selector: 'fk-not-found',
  standalone: true,
  imports: [
    RouterLink,
    TopbarComponent,
    FooterComponent,
    NotFoundComponent
  ],
  templateUrl: './not-found.component.html'
})
export class FkNotFoundComponent {

}

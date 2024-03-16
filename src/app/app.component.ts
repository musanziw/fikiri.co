import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {TopbarComponent} from "./shared/utils/topbar/topbar.component";
import {FooterComponent} from "./shared/utils/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterModule, TopbarComponent, FooterComponent],
  templateUrl: './app.component.html',
})

export class AppComponent {
}

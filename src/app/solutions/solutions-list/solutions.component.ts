import { Component } from '@angular/core';
import { Solution } from '../../shared/types/models-interfaces';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SolutionCardComponent } from '../../shared/ui/solution-card/solution-card.component';
import { TopbarComponent } from '../../shared/ui/topbar/topbar.component';
import { FooterComponent } from '../../shared/ui/footer/footer.component';

@Component({
  selector: 'fk-solutions',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SolutionCardComponent,
    TopbarComponent,
    FooterComponent,
  ],
  templateUrl: './solutions.component.html',
})
export class SolutionsComponent {
  solutions: Solution[] = [];
}

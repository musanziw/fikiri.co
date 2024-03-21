import { Component, inject, OnInit } from '@angular/core';
import { Solution } from '../../../shared/types/models-interfaces';
import { SolutionCardComponent } from '../../../shared/ui/solution-card/solution-card.component';
import { HomeService } from '../../home.service';

@Component({
  selector: 'ui-winning-solutions',
  standalone: true,
  imports: [SolutionCardComponent],
  templateUrl: './winnging-solutions.component.html',
})
export class WinningSolutionsComponent implements OnInit {
  solutions: Solution[] = [];
  homeService = inject(HomeService);

  ngOnInit() {
    this.homeService.getAwardSolutions().subscribe((response) => {
      this.solutions = response.data;
    });
  }
}

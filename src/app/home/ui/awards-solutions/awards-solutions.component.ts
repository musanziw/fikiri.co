import { Component, inject, OnInit } from '@angular/core';
import { Solution } from '../../../shared/types/models-interfaces';
import { SolutionCardComponent } from '../../../shared/ui/solution-card/solution-card.component';
import { HomeService } from '../../home.service';

@Component({
  selector: 'ui-awards-solutions',
  standalone: true,
  imports: [SolutionCardComponent],
  templateUrl: './awards-solutions.component.html',
})
export class AwardsSolutionsComponent implements OnInit {
  solutions: Solution[] = [];
  homeService = inject(HomeService);

  ngOnInit() {
    this.homeService.getAwardSolutions().subscribe((response) => {
      this.solutions = response.data;
    });
  }
}

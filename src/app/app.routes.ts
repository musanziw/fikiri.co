import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";


export const routes: Routes = [{
  path: '',
  title: 'Fikiri | home',
  component: HomeComponent
}, {
  path: 'solutions',
  title: 'Fikiri | Solutions',
  loadComponent: () => import('./solutions/solutions.component').then(c => c.SolutionsComponent)
}, {

  path: 'solutions/:id',
  title: 'Fikiri | Solution - details',
  loadComponent: () => import('./solution-details/solution-details.component').then(c => c.SolutionDetailsComponent)
}];

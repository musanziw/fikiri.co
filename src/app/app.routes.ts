import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Fikiri | home',
    component: HomeComponent,
  },
  {
    path: 'solutions',
    title: 'Fikiri | Solutions',
    loadComponent: () =>
      import('./mapped-solutions/solutions/solutions.component').then(
        (c) => c.SolutionsComponent
      ),
  },
  {
    path: 'solutions/:id',
    title: 'Fikiri | Solution - details',
    loadComponent: () =>
      import('./mapped-solutions/solution/solution-details.component').then(
        (c) => c.SolutionDetailsComponent
      ),
  },
  {
    path: 'register',
    title: 'Fikiri | Signup',
    loadComponent: () =>
      import('./register/register.component').then((c) => c.RegisterComponent),
  },
  {
    path: 'login',
    title: 'Fikiri | Signin',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'profile',
    title: 'Fikiri | Profile',
    loadComponent: () =>
      import('./profile/profile.component').then((c) => c.ProfileComponent),
  },
];

import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  {
    path: 'solutions/:id',
    title: 'Solution - details',
    loadComponent: () => import('./solutions/solution-details/solution.component').then((c) => c.SolutionComponent),
  },
  {
    path: 'solutions',
    title: 'Solutions',
    loadComponent: () => import('./solutions/solutions-list/solutions.component').then((c) => c.SolutionsComponent),
  },
  {
    path: 'register',
    title: 'Signup',
    loadComponent: () => import('./register/register.component').then((c) => c.RegisterComponent),
  },
  {
    path: 'login',
    title: 'Signin',
    loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'profile',
    title: 'Profile',
    loadComponent: () => import('./profile/profile.component').then((c) => c.ProfileComponent),
  },
  {
    path: '',
    title: 'home',
    component: HomeComponent,
  },
  {
    path: '**',
    title: 'Page non trouvée',
    loadComponent: () => import('./not-found/not-found.component').then((c) => c.FkNotFoundComponent),
  },
];

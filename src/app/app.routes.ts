import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {authGuard} from './shared/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Fikiri | home',
    component: HomeComponent,
  },
  {
    path: 'solutions-list',
    title: 'Fikiri | Solutions',
    loadComponent: () => import('./solutions/solutions-list/solutions.component').then((c) => c.SolutionsComponent),
  },
  {
    path: 'solution-details/:id',
    title: 'Fikiri | Solution - details',
    loadComponent: () => import('./solutions/solution-details/solution.component').then((c) => c.SolutionComponent),
  },
  {
    path: 'register',
    title: 'Fikiri | Signup',
    loadComponent: () => import('./register/register.component').then((c) => c.RegisterComponent),
  },
  {
    path: 'login',
    title: 'Fikiri | Signin',
    loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'profile',
    title: 'Fikiri | Profile',
    canActivate: [authGuard],
    loadComponent: () => import('./profile/profile.component').then((c) => c.ProfileComponent),
  },
  {
    path: '**',
    title: 'Fikiri | Home',
    loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent),
  },
];

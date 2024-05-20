import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: 'solutions/:id',
    title: 'Solution - details',
    loadComponent: () => import('./solution/solution.component').then((c) => c.SolutionComponent)
  },
  {
    path: 'solutions',
    title: 'Solutions',
    loadComponent: () => import('./solutions/solutions.component').then((c) => c.SolutionsComponent)
  },
  {
    path: 'register',
    title: 'Inscription',
    loadComponent: () => import('./auth/register/register.component').then((c) => c.RegisterComponent)
  },
  {
    path: 'login',
    title: 'Connexion',
    loadComponent: () => import('./auth/login/login.component').then((c) => c.LoginComponent)
  },
  {
    path: 'reset-password-request',
    title: 'Réinitialisation du mot de passe',
    loadComponent: () =>
      import('./auth/reset-password-request/reset-password-request.component').then(
        (c) => c.ResetPasswordRequestComponent
      )
  },
  {
    path: 'reset-password',
    title: 'Réinitialisation du mot de passe',
    loadComponent: () => import('./auth/reset-password/reset-password.component').then((c) => c.ResetPasswordComponent)
  },
  {
    path: 'profile',
    title: 'Profil',
    loadComponent: () => import('./auth/profile/profile.component').then((c) => c.ProfileComponent)
  },
  {
    path: '',
    title: 'Accueil',
    component: HomeComponent
  },
  {
    path: '**',
    title: 'Page non trouvée',
    loadComponent: () => import('./not-found/not-found.component').then((c) => c.NotFoundComponent)
  }
];

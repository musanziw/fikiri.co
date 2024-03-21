import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideClientHydration} from '@angular/platform-browser';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {routes} from './app.routes';
import {provideToastr} from 'ngx-toastr';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {authReducers} from './shared/auth/store/auth.reducers';
import {AuthEffects} from './shared/auth/store/auth.effects';
import {winningSolutionsReducers} from './home/ui/winning-solutions/store/winning-solutions.reducers';
import {WinningSolutionsEffects} from './home/ui/winning-solutions/store/winning-solutions.effets';
import {solutionsReducers} from './mapped-solutions/solutions/store/solutions.reducers';
import {SolutionsEffect} from './mapped-solutions/solutions/store/solutions.effets';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideToastr({
      timeOut: 6000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    provideEffects(AuthEffects, WinningSolutionsEffects, SolutionsEffect),
    provideStore({
      auth: authReducers,
      winningSolutions: winningSolutionsReducers,
      solutions: solutionsReducers,
    }),
    provideStoreDevtools({maxAge: 25, logOnly: !isDevMode()}),
  ],
};

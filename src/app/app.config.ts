import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {provideClientHydration} from '@angular/platform-browser';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {routes} from './app.routes';
import {provideToastr} from 'ngx-toastr';
import {provideState, provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {authFeatureKey, authReducers} from './shared/auth/store/auth.reducers';
import {AuthEffects} from './shared/auth/store/auth.effects';
import {winningSolutionsReducers} from './home/components/winning-solutions/store/winning-solutions.reducers';
import {WinningSolutionsEffects} from './home/components/winning-solutions/store/winning-solutions.effets';
import {solutionsReducers} from './solutions/solutions-list/store/solutions.reducers';
import {SolutionsEffect} from './solutions/solutions-list/store/solutions.effets';
import {solutionReducers} from './solutions/solution-details/store/solution.reducers';
// import { SolutionEffect } from './solutions-list/solution-details/store/solution-details.effets';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideToastr({
      timeOut: 6000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    provideEffects(AuthEffects, WinningSolutionsEffects, SolutionsEffect),
    provideState(authFeatureKey, authReducers),
    provideStore({
      winningSolutions: winningSolutionsReducers,
      solutions: solutionsReducers,
      solution: solutionReducers,
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75
    }),
  ],
};

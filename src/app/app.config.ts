import {ApplicationConfig, isDevMode} from '@angular/core';
import {
  InMemoryScrollingFeature,
  InMemoryScrollingOptions,
  provideRouter,
  TitleStrategy,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import {provideClientHydration} from '@angular/platform-browser';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {routes} from './app.routes';
import {provideToastr} from 'ngx-toastr';
import {provideState, provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {authFeatureKey, authReducers} from './shared/auth/store/auth.reducers';
import {winningSolutionsReducers} from './home/components/winning-solutions/store/winning-solutions.reducers';
import {solutionsReducers} from './solutions/solutions-list/store/solutions.reducers';
import {solutionReducers} from './solutions/solution-details/store/solution.reducers';
import {loginReducers} from "./login/store/login.reducers";
import * as loginEffects from "./login/store/login.effects";
import * as authEffects from './shared/auth/store/auth.effects';
import * as winningSolutionsEffects from "./home/components/winning-solutions/store/winning-solutions.effets";
import * as solutionEffets from "./solutions/solution-details/store/solution.effets";
import * as solutionsEffets from "./solutions/solutions-list/store/solutions.effets";
import {TemplatePageTitleStrategy} from "./shared/services/title-strategy.service";


const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
}
const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, inMemoryScrollingFeature, withViewTransitions()),
    {provide: TitleStrategy, useClass: TemplatePageTitleStrategy},
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideToastr({
      timeOut: 6000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    provideEffects(
      authEffects,
      loginEffects,
      winningSolutionsEffects,
      solutionEffets,
      solutionsEffets
    ),
    provideState(authFeatureKey, authReducers),
    provideStore({
      login: loginReducers,
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

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
import {PageTitleStrategy} from "./page-title.strategy";
import {provideStore} from "@ngrx/store";
import {routes} from './app.routes';
import {provideToastr} from 'ngx-toastr';
import {provideEffects} from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {authReducers} from './shared/auth/data-access/auth.reducers';
import {winningSolutionsReducers} from './home/components/winning-solutions/store/winning-solutions.reducers';
import {solutionsReducers} from './solutions/solutions-list/store/solutions.reducers';
import {recentCallReducers} from "./home/components/recent-call/store/recent-call.reducers";
import * as authEffects from './shared/auth/data-access/auth.effects';
import * as winningSolutionsEffects from "./home/components/winning-solutions/store/winning-solutions.effets";
import * as solutionsEffets from "./solutions/solutions-list/store/solutions.effets";
import * as callsEffets from "./home/components/recent-call/store/recent-call.effets";

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
}
const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, inMemoryScrollingFeature, withViewTransitions()),
    {provide: TitleStrategy, useClass: PageTitleStrategy},
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
      callsEffets,
      winningSolutionsEffects,
      solutionsEffets
    ),
    provideStore({
      auth: authReducers,
      recentCall: recentCallReducers,
      winningSolutions: winningSolutionsReducers,
      solutions: solutionsReducers,
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

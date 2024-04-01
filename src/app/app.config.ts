import {ApplicationConfig} from '@angular/core';
import {provideRouter, withViewTransitions} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideClientHydration} from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes, withViewTransitions(),
    ),
    provideAnimationsAsync(),
    provideClientHydration()
  ]
};

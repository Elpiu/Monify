import {
  ApplicationConfig,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  Provider,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideServiceWorker} from '@angular/service-worker';
import {provideIcons, provideNgIconsConfig} from '@ng-icons/core';
import * as tablerIcons from '@ng-icons/tabler-icons';
import {TablerIconPrefixPipe} from './utils/pipe/tabler-icon-prefix-pipe';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),


    ...provideIconsFromTabler(),
    ...provideUtilsPipe(),

    provideRouter(routes), provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};


function provideIconsFromTabler(): Provider[] {
  return [
    provideIcons({...tablerIcons}),
    provideNgIconsConfig({size: '1.5rem'}),
  ]
}


function provideUtilsPipe(): any {
  return [
    TablerIconPrefixPipe
  ]
}

import { providePrimeNG } from 'primeng/config';
import { Provider, EnvironmentProviders } from '@angular/core';
import Noir from '../theme/noir';
import { MessageService } from 'primeng/api';

export function provideUiKitConfig(): (Provider | EnvironmentProviders)[] {
  return [
    providePrimeNG({
      theme: Noir,
      ripple: false,
    }),

    ...otherPrimeNgProviders(),
  ];
}

function otherPrimeNgProviders() {
  return [MessageService];
}

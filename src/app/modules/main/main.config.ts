import {Provider} from '@angular/core';
import {provideIcons, provideNgIconsConfig} from '@ng-icons/core';
import * as tablerIcons from '@ng-icons/tabler-icons';
import {TablerIconPrefixPipe} from '../../utils/pipe/tabler-icon-prefix-pipe';


function provideIconsFromTabler(): Provider[] {
  return [
    provideIcons({...tablerIcons}),
    provideNgIconsConfig({size: '1.5rem'}),
  ]
}


function provideUtilsPipe(): Provider[] {
  return [
    TablerIconPrefixPipe
  ]
}


export function provideAllFromMain(): (Provider)[] {
  return [
    ...provideIconsFromTabler(),
    ...provideUtilsPipe(),
  ]
}

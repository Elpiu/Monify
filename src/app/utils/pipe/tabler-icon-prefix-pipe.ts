import {Pipe, PipeTransform} from '@angular/core';

const TABLER_ICON_PREFIX = 'tabler';


@Pipe({
  name: 'tablerIconPrefixPipe'
})
export class TablerIconPrefixPipe implements PipeTransform {

  transform(value: string): string {
    if (!value || value.startsWith(TABLER_ICON_PREFIX)) return value;
    return `${TABLER_ICON_PREFIX}${value.charAt(0).toUpperCase()}${value.slice(1)}`;
  }

}

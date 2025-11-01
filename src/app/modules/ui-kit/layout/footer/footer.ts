import { Component, inject } from '@angular/core';
import packageInfo from '../../../../../../package.json';
import { NgIconComponent } from '@ng-icons/core';
import { firstValueFrom } from 'rxjs';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [NgIconComponent, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  readonly version: string = packageInfo.version;
  readonly currentYear: number = new Date().getFullYear();
  private readonly translate = inject(TranslateService);

  readonly canShare = !!navigator.share;

  async shareApp(): Promise<void> {
    const translations = await firstValueFrom(
      this.translate.get(['share.title', 'share.message-app'])
    );

    const shareData = {
      title: translations['share.title'],
      text: translations['share.message-app'],
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData);
      console.debug('App shared!');
    }
  }
}

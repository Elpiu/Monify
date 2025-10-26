import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatabaseManager } from './database/database-manager';
import { NgIcon } from '@ng-icons/core';
import { TablerIconPrefixPipe } from './utils/pipe/tabler-icon-prefix-pipe';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { MenubarModule } from 'primeng/menubar';
import { TranslateDirective, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NoteMeCalendar } from './modules/calendar-me/note-me-calendar/note-me-calendar';
import { Topbar } from './modules/ui-kit/layout/topbar/topbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { Footer } from './modules/ui-kit/layout/footer/footer';
import { PwaInstallService } from './modules/pwa/pwa-install-service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    MenubarModule,
    CommonModule,
    NoteMeCalendar,
    Topbar,
    NoteMeCalendar,
    ToastModule,
    Topbar,
    Footer,
    TranslatePipe,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [ConfirmationService, MessageService],
})
export class App {
  dbManager = inject(DatabaseManager);
  private pwaInstallService = inject(PwaInstallService);
  private messageService = inject(MessageService);
  private translate = inject(TranslateService);

  protected readonly title = signal('Monify');

  public categories = this.dbManager.allCategories;

  constructor() {
    effect(() => {
      if (this.pwaInstallService.canShowInstallPrompt()) {
        this.showInstallPromptToast();
      }
    });
  }
  private async showInstallPromptToast(): Promise<void> {
    const translations = await this.translate
      .get(['pwa.install_title', 'pwa.install_message'])
      .toPromise();

    this.messageService.add({
      key: 'install-pwa',
      severity: 'info',
      sticky: true,
      summary: translations['pwa.install_title'],
      detail: translations['pwa.install_message'],
    });
  }

  /**
   * Chiamato dal pulsante "Installa" nel template del toast.
   */
  onInstallPwa(): void {
    this.messageService.clear('install-pwa'); // Chiude il toast
    this.pwaInstallService.triggerInstallPrompt(); // Avvia il prompt nativo
  }

  /**
   * Chiamato dal pulsante "Dopo" per chiudere il toast.
   */
  onRejectInstallPwa(): void {
    this.messageService.clear('install-pwa');
  }
}

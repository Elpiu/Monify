import { afterNextRender, computed, Injectable, signal, Signal } from '@angular/core';

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class PwaInstallService {
  private installPromptEvent = signal<BeforeInstallPromptEvent | null>(null);
  public canShowInstallPrompt: Signal<boolean> = computed(() => !!this.installPromptEvent());

  constructor() {
    // Usiamo afterNextRender per assicurarci di interagire con `window`
    // solo dopo che l'app è stata renderizzata la prima volta.
    afterNextRender(() => {
      window.addEventListener('beforeinstallprompt', (e: Event) => {
        // Preveniamo che il mini-infobar di default del browser appaia.
        e.preventDefault();

        // Salviamo l'evento nel nostro segnale per usarlo più tardi.
        this.installPromptEvent.set(e as BeforeInstallPromptEvent);
        console.log('PWA: App è installabile. Evento salvato.');
      });
    });
  }

  /**
   * Mostra il prompt di installazione nativo del browser.
   * Deve essere chiamato da un'azione dell'utente (es. un click).
   */
  public async triggerInstallPrompt(): Promise<void> {
    const promptEvent = this.installPromptEvent();
    if (!promptEvent) {
      console.warn('PWA: Tentativo di mostrare il prompt senza un evento valido.');
      return;
    }

    // Mostra il prompt di installazione nativo.
    await promptEvent.prompt();

    // Attende la scelta dell'utente.
    const { outcome } = await promptEvent.userChoice;
    console.log(`PWA: Scelta dell'utente: ${outcome}`);

    // L'evento è monouso. Lo resettiamo dopo averlo usato.
    this.installPromptEvent.set(null);
  }
}

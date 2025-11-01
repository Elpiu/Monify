import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ListView } from './list-view';
import { TranslatePipe } from '@ngx-translate/core';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-feature-suggestion-page',
  imports: [CommonModule, ButtonModule, DialogModule, ListView, TranslatePipe, ProgressSpinner],
  template: `
    <div class="p-4 md:p-8">
      <header class="mb-8 p-6 bg-primary-100 dark:bg-primary-900/50 rounded-lg text-center">
        <h1 class="text-3xl font-bold text-primary-700 dark:text-primary-200 mb-2">
          {{ 'feature-suggestion.title' | translate }}
        </h1>
        <p class="text-lg text-surface-600 dark:text-surface-300 mb-4">
          {{ 'feature-suggestion.description' | translate }}
        </p>
        <p-button label="Suggest a Feature" icon="pi pi-plus" (onClick)="showFormDialog()" />
      </header>

      <main>
        <h2 class="text-2xl font-semibold mb-4 text-surface-800 dark:text-surface-100">
          {{ 'feature-suggestion.list_title' | translate }}
        </h2>
        <app-list-view />
      </main>
    </div>

    <p-dialog
      [(visible)]="isDialogVisible"
      [modal]="true"
      [style]="{ width: '90vw', height: '80vh', 'max-width': '800px' }"
      [contentStyle]="{ height: '100%', display: 'flex', 'flex-direction': 'column', padding: '0' }"
      [draggable]="false"
      [resizable]="false"
    >
      @if (isIframeLoading()) {
      <div
        class="absolute inset-0 flex justify-center items-center bg-surface-50 dark:bg-surface-900"
      >
        <p-progressSpinner aria-label="Loading form" />
      </div>
      }
      <iframe
        [src]="googleFormUrl"
        width="100%"
        height="100%"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        (load)="isIframeLoading.set(false)"
      >
      </iframe>
    </p-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureSuggestionPage {
  isDialogVisible = signal(false);
  isIframeLoading = signal(true);

  readonly googleFormUrl: SafeResourceUrl;

  private readonly formUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLScUFYKbbhRb7EcQy5n_CZP3DZj--TaB3-AeOh6Zcr8W9xzA3g/viewform?usp=dialog&embedded=true';

  constructor(private sanitizer: DomSanitizer) {
    // Sanitize the URL to prevent security risks with iframes
    this.googleFormUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.formUrl);
  }

  resetIframeState(): void {
    this.isIframeLoading.set(true);
  }

  showFormDialog(): void {
    this.isIframeLoading.set(true);
    this.isDialogVisible.set(true);
  }
}

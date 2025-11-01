import { FormSheetService } from './form-sheet-service';
import { Suggestion } from './suggestion.model';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PTagSeverityType } from '../../utils/ng-prime-lib/severity.type';
import { NgIcon } from '@ng-icons/core';
import { TranslatePipe } from '@ngx-translate/core';
type VoteStatus = 'up' | 'down' | null;

@Component({
  selector: 'app-list-view',
  imports: [
    CommonModule,
    DataViewModule,
    TranslatePipe,
    ButtonModule,
    TagModule,
    ProgressSpinnerModule,
    NgIcon,
  ],
  template: `
    @if (isLoading()) {
    <div class="flex justify-center items-center p-8">
      <p-progressSpinner aria-label="Loading suggestions" />
    </div>
    } @else if (error()) {
    <div class="p-4 border-l-4 border-red-500 bg-red-100 text-red-700">
      <p>{{ 'feature-suggestion.error-loading' | translate }}</p>
    </div>
    } @else {
    <div class="flex flex-col gap-4">
      @for (item of suggestions(); track item.rowId) {
      <div
        class="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-surface-0 dark:bg-surface-800"
      >
        <div class="flex-1">
          <p class="text-sm font-semibold mb-2 text-surface-800 dark:text-surface-100">
            {{ item.suggestion }}
          </p>
          <p-tag [value]="item.category" [severity]="getCategorySeverity(item.category)" />
        </div>
        <!-- Votes 
        <div class="flex items-center gap-2 ml-4">
          <p-button
            icon="pi pi-arrow-up"
            styleClass="p-button-rounded p-button-text p-button-success"
            [disabled]="getVoteStatus(item.rowId) !== null"
            (onClick)="handleVote(item, 'upvote')"
          >
            <ng-icon name="tablerArrow-big-up" />
          </p-button>
          <span class="font-bold text-lg w-8 text-center">{{ item.upvotes - item.downvotes }}</span>
          <p-button
            icon="pi pi-arrow-down"
            styleClass="p-button-rounded p-button-text p-button-danger"
            [disabled]="getVoteStatus(item.rowId) !== null"
            (onClick)="handleVote(item, 'downvote')"
            ><ng-icon name="tablerArrow-big-down"
          /></p-button>
        </div>
        -->
      </div>
      } @empty {
      <p class="text-center text-surface-500 dark:text-surface-400">
        {{ 'feature-suggestion.empty-suggestions' | translate }}
      </p>
      }
    </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListView {
  private readonly formSheetService = inject(FormSheetService);

  readonly suggestions = signal<Suggestion[]>([]);
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);

  private userVotes = new Map<number, VoteStatus>();

  constructor() {
    this.loadUserVotes();
    this.loadSuggestions();
  }

  private async loadSuggestions(): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const data = await this.formSheetService.getSuggestions();
      this.suggestions.set(
        data.sort((a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes))
      );
    } catch (err) {
      this.error.set((err as Error).message);
    } finally {
      this.isLoading.set(false);
    }
  }

  private loadUserVotes(): void {
    const storedVotes = localStorage.getItem('userVotes');
    if (storedVotes) {
      const parsedVotes: [number, VoteStatus][] = JSON.parse(storedVotes);
      this.userVotes = new Map(parsedVotes);
    }
  }

  getCategorySeverity(category: Suggestion['category']): PTagSeverityType {
    switch (category) {
      case 'New Feature Request':
        return 'success';
      case 'Improvement':
        return 'info';
      case 'Bug Report':
        return 'warn';
      default:
        return 'danger';
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, computed, inject, output } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NgIcon } from '@ng-icons/core';
import { MenubarModule } from 'primeng/menubar';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { TranslateService } from '@ngx-translate/core';
import { CalendarStorage } from '../../../../database/calendar-storeage';
import { exportToCsv } from '../../../../utils/export/dataToCSV';
import { toSignal } from '@angular/core/rxjs-interop';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule, ButtonModule, RouterModule, NgIcon, Menu, ConfirmPopupModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
  providers: [ConfirmationService],
})
export class Topbar {
  translate = inject(TranslateService);
  signalTranslateChange = toSignal(this.translate.onLangChange);

  readonly settingsClick = output<void>();
  private messageService = inject(MessageService);
  private calendarStorage = inject(CalendarStorage);
  private readonly confirmationService = inject(ConfirmationService);

  items = computed<MenuItem[]>(() => {
    this.signalTranslateChange();
    return [
      {
        label: this.translate.instant('common.settings'),
        items: [
          {
            label: this.translate.instant('common.exportData'),
            icon: 'tablerFile-type-csv',
            command: () => this.downloadData(),
          },
          {
            label: this.translate.instant('common.wipeData'),
            icon: 'tablerTrash',
            command: (event) => this.confirmDeleteAllData(event.originalEvent!),
          },
        ],
      },
    ];
  });

  async downloadData(): Promise<void> {
    const data = await this.calendarStorage.getAllMoodDataForExport();
    if (data.length > 0) {
      exportToCsv('monify-data-export.csv', data);
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: this.translate.instant('note-me-calendar.noDataToExport'),
      });
    }
  }

  handleMenuItemClick(event: MouseEvent, item: MenuItem, menu: Menu): void {
    event.stopPropagation();

    if (item.command) {
      item.command({ originalEvent: event, item });
    }

    if (item.label !== this.translate.instant('common.wipeData')) {
      menu.hide();
    }
  }

  confirmDeleteAllData(event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      header: this.translate.instant('common.are-you-sure'),
      message: this.translate.instant('note-me-calendar.confirmMessageWipeData'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('common.yes-delete'),
      rejectLabel: this.translate.instant('common.cancel'),
      acceptButtonStyleClass: 'p-button-danger',
      accept: async () => {
        await this.calendarStorage.clearAllMoodData();
        this.messageService.add({
          severity: 'success',
          summary: this.translate.instant('common.operation-success'),
          detail: this.translate.instant('note-me-calendar.operation-wipeData'),
        });
      },
    });
  }
}

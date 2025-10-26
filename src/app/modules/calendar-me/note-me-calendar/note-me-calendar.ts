import { DatePipe, NgClass, NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { getEmojiByMood, Mood, MoodItem, moodList } from '../moodMap';
import { CalendarStorage, MoodItemDO } from '../../../database/calendar-storeage';
import { TranslatePipe } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { fromCalendarDateNgPrimeToYYYYYMMDDString } from '../utils/date.utils';

@Component({
  selector: 'app-note-me-calendar',
  imports: [
    DatePickerModule,
    DialogModule,
    TranslatePipe,
    Button,
    DatePipe,
    InputTextModule,
    FloatLabel,
    FormsModule,
  ],
  templateUrl: './note-me-calendar.html',
  styleUrl: './note-me-calendar.css',
  providers: [CalendarStorage, DatePipe],
})
export class NoteMeCalendar {
  // Injects
  private calendarStorage = inject(CalendarStorage);
  private datePipe = inject(DatePipe);

  // State Signals
  isModalVisible = signal(false);
  calendarValue = signal<Date | null>(null);
  noteText = signal('');
  selectedMood = signal<MoodItem | null>(null);
  editingMood = signal<MoodItemDO | null>(null);

  // Constants
  readonly moodList = moodList;

  // Data from Storage
  allMoodData = this.calendarStorage.allMoodData;
  allMoodDataAsMap = computed<Map<string, MoodItemDO>>(() => {
    const map = new Map<string, MoodItemDO>();
    this.allMoodData().forEach((moodData) => {
      map.set(moodData.date, moodData);
    });
    return map;
  });

  handleSelect(date: Date): void {
    const dateString = this.datePipe.transform(date, 'yyyy-MM-dd')!;
    const existingData = this.allMoodDataAsMap().get(dateString);

    this.calendarValue.set(date);

    if (existingData) {
      // Modalità Modifica: popoliamo i dati esistenti
      this.editingMood.set(existingData);
      this.noteText.set(existingData.note);
      const currentMood = this.moodList.find((m) => m.name === existingData.mood);
      this.selectedMood.set(currentMood ?? null);
    } else {
      // Modalità Creazione: resettiamo lo stato
      this.editingMood.set(null);
      this.noteText.set('');
      this.selectedMood.set(null);
    }

    this.isModalVisible.set(true);
  }

  async handleSave(): Promise<void> {
    if (!this.selectedMood() || !this.calendarValue()) return;

    const moodDataPayload = {
      date: this.datePipe.transform(this.calendarValue(), 'yyyy-MM-dd')!,
      mood: this.selectedMood()!.name,
      note: this.noteText(),
    };

    const currentEditingMood = this.editingMood();
    if (currentEditingMood?.id) {
      // Siamo in modalità UPDATE
      await this.calendarStorage.updateMoodData(currentEditingMood.id, moodDataPayload);
    } else {
      // Siamo in modalità CREATE
      await this.calendarStorage.addMoodData(moodDataPayload);
    }

    this.closeAndResetModal();
  }

  async handleDelete(): Promise<void> {
    const currentEditingMood = this.editingMood();
    if (currentEditingMood?.id) {
      await this.calendarStorage.deleteMoodData(currentEditingMood.id);
      this.closeAndResetModal();
    }
  }

  selectMood(mood: MoodItem): void {
    this.selectedMood.set(mood);
  }

  closeAndResetModal(): void {
    this.isModalVisible.set(false);
    this.editingMood.set(null);
    this.selectedMood.set(null);
    this.noteText.set('');
    this.calendarValue.set(null);
  }

  getEmojiForDate(date: any): string | null {
    const convertedDate = fromCalendarDateNgPrimeToYYYYYMMDDString(date);
    const moodItem = this.allMoodDataAsMap().get(convertedDate);
    return moodItem ? getEmojiByMood(moodItem.mood) : null;
  }
}

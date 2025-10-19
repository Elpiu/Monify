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
import {
  fromCalendarDateNgPrimeToYYYYYMMDDString,
  fromDateToYYYYMMDDString,
} from '../utils/date.utils';

@Component({
  selector: 'app-note-me-calendar',
  imports: [
    DatePickerModule,
    DialogModule,
    TranslatePipe,
    Button,
    NgTemplateOutlet,
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

  isModalVisible = signal<boolean>(false);

  calendarValue = signal<Date | null>(null);
  noteText = signal<string>('');

  moodList = moodList;
  allMoodData = this.calendarStorage.allMoodData;
  allMoodDataAsMap = computed<Map<string, MoodItemDO>>(() => {
    if (!this.allMoodData()) return new Map();
    console.log('allMoodData', this.allMoodData());
    const map = new Map<string, MoodItemDO>();
    this.allMoodData().forEach((moodData) => {
      map.set(moodData.date, moodData);
    });
    console.log('map', map);
    return map;
  });

  selectedMood = signal<MoodItem | null>(null);

  handleSave() {
    this.isModalVisible.set(false);
    this.calendarStorage.addMoodData({
      date: this.datePipe.transform(this.calendarValue(), 'yyyy-MM-dd')!,
      mood: this.selectedMood()!.name,
      note: this.noteText(),
    });
  }

  handleSelect(event: any) {
    event = this.datePipe.transform(event, 'yyyy-MM-dd');

    this.noteText.set('');
    this.isModalVisible.set(true);
  }

  selectMood(mood: MoodItem) {
    this.selectedMood.set(mood);
  }

  getEmojiForDate(date: any): string | null {
    const convertedDate = fromCalendarDateNgPrimeToYYYYYMMDDString(date);
    const moodItem = this.allMoodDataAsMap().get(convertedDate);
    return moodItem ? getEmojiByMood(moodItem.mood) : null;
  }
}

import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import Dexie, { Table, liveQuery } from 'dexie';
import { MainConfig } from '../config/mainConfig';
import { Mood } from '../modules/calendar-me/moodMap';

export interface MoodItemDO {
  id?: number;
  date: string;
  mood: Mood;
  note: string;
}

@Injectable({
  providedIn: 'root',
})
export class CalendarStorage extends Dexie {
  moodData!: Table<Omit<MoodItemDO, 'id'>, number>;

  constructor() {
    super(MainConfig.MOOD_DB);
    this.version(1).stores({
      moodData: '++id, date',
    });
  }

  public allMoodData: Signal<MoodItemDO[]> = toSignal<MoodItemDO[]>(
    liveQuery(() => {
      const { start, end } = this.getCurrentYearRange();
      return this.moodData.where('date').between(start, end, true, true).toArray();
    }) as any
  ) as Signal<MoodItemDO[]>;

  public addMoodData(data: Omit<MoodItemDO, 'id'>) {
    console.info('Added in moodData table new entry', data);
    this.moodData.add(data);
  }

  private getCurrentYearRange(): { start: string; end: string } {
    const year = new Date().getFullYear();
    const start = `${year}-01-01`;
    const end = `${year}-12-31`;
    return { start, end };
  }
}

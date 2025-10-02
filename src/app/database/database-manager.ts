import {Injectable, Signal} from '@angular/core';
import Dexie, {liveQuery, Table} from 'dexie';
import {Category, defaultCategories} from '../model/category';
import {MainConfig} from '../config/mainConfig';
import {toSignal} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class DatabaseManager extends Dexie {
  categories!: Table<Omit<Category, 'id'>, number>;

  constructor() {
    super(MainConfig.MAIN_DB);
    this.version(1).stores({
      categories: '++id',
    });
    // The populate event occurs only once in a database’ lifetime -
    // in case the database was not present on the client when db.open() was called,
    // and the object stores was needed to be created.
    this.on('populate', async () => {
      await this.categories.bulkAdd(defaultCategories)
    });
  }

  public allCategories: Signal<Category[]> =
    toSignal<Category[]>(
      liveQuery(() => this.categories.toArray()) as any,
    ) as Signal<Category[]>

}

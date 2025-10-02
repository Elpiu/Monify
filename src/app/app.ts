import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {DatabaseManager} from './database/database-manager';
import {NgIcon} from '@ng-icons/core';
import {TablerIconPrefixPipe} from './utils/pipe/tabler-icon-prefix-pipe';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIcon, TablerIconPrefixPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {

  dbManager = inject(DatabaseManager);

  protected readonly title = signal('Monify');

  public categories = this.dbManager.allCategories

  async ngOnInit() {
    const storage = await navigator.storage.estimate()
    console.log("Estimate", storage)

  }


  addCategory() {
    // random charaters
    const name = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    const description = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    this.dbManager.categories.add({name, description, icon: '', type: 'expense'});
  }
}

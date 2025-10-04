import { Component, inject, OnInit, signal } from '@angular/core';
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
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NgIcon,
    TablerIconPrefixPipe,
    ButtonModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    Ripple,
    MenubarModule,
    CommonModule,
    TranslatePipe,
    TranslateDirective,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  dbManager = inject(DatabaseManager);

  protected readonly title = signal('Monify');

  public categories = this.dbManager.allCategories;

  async ngOnInit() {
    const storage = await navigator.storage.estimate();
    console.log('Estimate', storage);
  }

  addCategory() {
    // random charaters
    const name = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    const description = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    this.dbManager.categories.add({ name, description, icon: '', type: 'expense' });
  }

  items = signal([
    {
      label: 'Home',
      icon: 'pi pi-home',
    },
    {
      label: 'Projects',
      icon: 'pi pi-search',
      badge: '3',
      items: [
        {
          label: 'Core',
          icon: 'pi pi-bolt',
          shortcut: '⌘+S',
        },
        {
          label: 'Blocks',
          icon: 'pi pi-server',
          shortcut: '⌘+B',
        },
        {
          separator: true,
        },
        {
          label: 'UI Kit',
          icon: 'pi pi-pencil',
          shortcut: '⌘+U',
        },
      ],
    },
  ]);
}

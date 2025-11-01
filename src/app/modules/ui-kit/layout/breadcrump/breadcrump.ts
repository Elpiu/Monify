import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NgIcon } from '@ng-icons/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-breadcrump',
  imports: [CommonModule, BreadcrumbModule, NgIcon, RouterLink, TranslatePipe],
  template: `
    <!-- Il breadcrumb viene renderizzato solo se il segnale isVisible è true -->
    @if (isVisible()) {
    <div class="px-4 py-2">
      <p-breadcrumb [model]="items()" [home]="homeItem">
        <!-- Template custom per ogni elemento del breadcrumb -->
        <ng-template pTemplate="item" let-item>
          <a
            [routerLink]="item.routerLink"
            class="p-menuitem-link flex items-center gap-2 transition-colors hover:text-primary-500"
          >
            @if (item.icon) {
            <ng-icon [name]="item.icon" class="text-base" />
            } @if (item.label) {
            <span>{{ item.label | translate }}</span>
            }
          </a>
        </ng-template>

        <!-- Template per il separatore, usando un'icona coerente -->
        <ng-template pTemplate="separator">
          <ng-icon name="tablerChevronRight" class="mx-2 text-gray-500" />
        </ng-template>
      </p-breadcrumb>
    </div>
    }
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class Breadcrump {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  // Definisce l'elemento "Home" fisso
  readonly homeItem: MenuItem = {
    icon: 'tablerHome',
    routerLink: '/',
  };

  // 1. Crea un segnale che si aggiorna ad ogni fine di navigazione,
  //    contenente l'array di breadcrumb calcolato.
  private readonly breadcrumbSignal = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.buildBreadcrumbs(this.activatedRoute.root))
    ),
    { initialValue: [] }
  );

  // 2. Segnale pubblico per il modello di p-breadcrumb
  items = computed(() => this.breadcrumbSignal());

  // 3. Segnale calcolato per la visibilità: true solo se ci sono elementi nel breadcrumb
  isVisible = computed(() => this.items().length > 0);

  /**
   * Costruisce ricorsivamente l'array di MenuItem per il breadcrumb
   * basandosi sui metadati 'data' della rotta.
   */
  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: MenuItem[] = []
  ): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    // Se non ci sono più rotte figlie, abbiamo finito
    if (children.length === 0) {
      return breadcrumbs;
    }

    // Itera sulle rotte figlie (di solito ce n'è solo una attiva)
    for (const child of children) {
      const routeUrl = child.snapshot.url.map((segment) => segment.path).join('/');

      // Aggiungi il segmento all'URL corrente
      if (routeUrl) {
        url += `/${routeUrl}`;
      }

      // Estrai i metadati dalla rotta
      const { breadcrumbName, icon } = child.snapshot.data;

      // Aggiungi l'elemento solo se ha un nome e non è la rotta home (route: '')
      if (breadcrumbName && child.snapshot.data['route'] !== '') {
        breadcrumbs.push({
          label: breadcrumbName,
          icon: icon, // Il nome dell'icona (es. 'tablerBlub')
          routerLink: url,
        });
      }

      // Continua la ricorsione con il figlio
      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}

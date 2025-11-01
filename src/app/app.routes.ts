import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/calendar-me/note-me-calendar/note-me-calendar').then(
        (m) => m.NoteMeCalendar
      ),
    data: {
      breadcrumbName: 'breadcrumb.home',
      route: '',
      icon: 'tablerHome',
    },
  },
  {
    path: 'suggestions',
    loadComponent: () =>
      import('./modules/feature-suggestion/feature-suggestion-page').then(
        (m) => m.FeatureSuggestionPage
      ),
    data: {
      breadcrumbName: 'breadcrumb.suggestions',
      route: 'suggestions',
      icon: 'tablerBulb',
    },
  },
];

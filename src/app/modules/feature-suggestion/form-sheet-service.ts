import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, catchError, throwError, lastValueFrom } from 'rxjs';
import { Suggestion, SuggestionsApiResponse } from './suggestion.model';

@Injectable({
  providedIn: 'root',
})
export class FormSheetService {
  private readonly http = inject(HttpClient);

  private readonly suggestionsApiUrl =
    'https://script.google.com/macros/s/AKfycbxRo5tFsMCioiNsd1ye0ZZpfixZfztHUhYtXDAKOWcj964JBReJYUNdtjZkwi7ONzt0/exec';

  async getSuggestions(): Promise<Suggestion[]> {
    const request$ = this.http
      .get<SuggestionsApiResponse>(this.suggestionsApiUrl)
      .pipe(catchError(this.handleError));

    const response = await lastValueFrom(request$);

    if (response.success && Array.isArray(response.suggestions)) {
      return response.suggestions as unknown as Suggestion[];
    }

    return [];
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`Backend returned code ${error.status}, body was: `, error.error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}

import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SolutionsReponseInterface } from '../types/solutions-response.interface';
import { Event, Thematic } from '../../shared/types/models-interfaces';
import { QueryParams } from '../types/query-params.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponseInterface } from '../types/search-response.interface';

@Injectable({
  providedIn: 'root'
})
export class SolutionsService {
  constructor(private httpClient: HttpClient) {}

  getSolutions(queryParams: QueryParams): Observable<SolutionsReponseInterface> {
    const { page, event, thematic } = queryParams;
    let params: HttpParams = new HttpParams();
    if (page) params = params.append('page', page);
    if (event) params = params.append('event', event);
    if (thematic) params = params.append('thematic', thematic);
    return this.httpClient
      .get<{ data: SolutionsReponseInterface }>('solutions/mapped', { params })
      .pipe(map((res) => res.data));
  }

  getThematics(eventId: number): Observable<Thematic[]> {
    return this.httpClient
      .get<{ data: Thematic[] }>(`thematics/event/${eventId}`)
      .pipe(map((response) => response.data));
  }

  getEvents(): Observable<Event[]> {
    return this.httpClient.get<{ data: Event[] }>('events').pipe(map((response) => response.data));
  }

  searchSolutions(query: string): Observable<SearchResponseInterface> {
    return this.httpClient
      .get<{ data: SearchResponseInterface }>('solutions/search', { params: { q: query } })
      .pipe(map((res) => res.data));
  }
}

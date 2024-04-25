import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  apiUrl: string = environment.apiUrl;
  options = {
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}

  get<T>(uri: string): Observable<T> {
    return this.http.get<{ data: T }>(this.apiUrl + uri, this.options).pipe(map((response) => response.data));
  }

  post<T, U>(uri: string, payload: U): Observable<T> {
    return this.http.post<{ data: T }>(this.apiUrl + uri, payload, this.options).pipe(map((response) => response.data));
  }

  patch<T, U>(uri: string, payload: U): Observable<T> {
    return this.http
      .patch<{ data: T }>(this.apiUrl + uri, payload, this.options)
      .pipe(map((response) => response.data));
  }

  logout(): Observable<void> {
    return this.http.post<void>(this.apiUrl + 'auth/logout', null, this.options);
  }
}

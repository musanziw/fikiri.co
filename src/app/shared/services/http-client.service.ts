import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  apiUrl: string = environment.apiUrl;
  options = {
    withCredentials: true,
  };

  constructor(private http: HttpClient) {
  }

  get<T>(uri: string): Observable<{ data: T }> {
    return this.http.get<{ data: T }>(this.apiUrl + uri, this.options);
  }

  post<T, U>(uri: string, payload: U): Observable<{ data: T }> {
    return this.http.post<{ data: T }>(this.apiUrl + uri, payload, this.options);
  }

  patch<T, U>(uri: string, payload: U): Observable<{ data: T }> {
    return this.http.patch<{ data: T }>(this.apiUrl + uri, payload, this.options);
  }
}

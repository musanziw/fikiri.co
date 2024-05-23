import { Injectable } from '@angular/core';
import { User } from '../../types/models-interfaces';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  authenticatedUser(): Observable<User> {
    return this.http.get<{ data: User }>('auth/profile').pipe(map((response) => response.data));
  }

  logout(): Observable<null> {
    return this.http.post('auth/logout', {}).pipe(map(() => null));
  }
}

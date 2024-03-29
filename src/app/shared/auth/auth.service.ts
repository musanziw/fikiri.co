import {Injectable} from '@angular/core';
import {HttpClientService} from '../services/http-client.service';
import {User} from '../types/models-interfaces';
import {Observable} from 'rxjs';
import {LoginPayloadInterface} from "../../login/types/login-payload.interface";
import {RegisterInterface} from "../../register/types/register.interface";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClientService) {
  }

  authenticatedUser(): Observable<User> {
    return this.http.get<User>('auth/profile');
  }

  register(payload: RegisterInterface): Observable<User> {
    return this.http.post<User, RegisterInterface>('auth/register', payload);
  }

  login(payload: LoginPayloadInterface): Observable<User> {
    return this.http.post<User, LoginPayloadInterface>('auth/login', payload);
  }

  logout(): Observable<null> {
    return this.http.post<null, {}>('auth/logout', {});
  }
}

import {Injectable} from '@angular/core';
import {HttpClientService} from '../../services/http-client.service';
import {User} from '../../types/models-interfaces';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpClientService) {
  }

  authenticatedUser(): Observable<User> {
    return this.http.get<User>('auth/profile');
  }

  logout(): Observable<null> {
    return this.http.post<null, {}>('auth/logout', {});
  }
}

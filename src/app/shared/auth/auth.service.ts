import {Injectable} from '@angular/core';
import {HttpClientService} from '../services/http-client.service';
import {User} from '../types/models-interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClientService) {
  }

  authenticatedUser() {
    return this.http.get<User>('auth/profile');
  }
}

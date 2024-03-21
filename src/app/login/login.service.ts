import {Injectable} from '@angular/core';
import {LoginPayloadInterface} from './types/login-payload.interface';
import {User} from '../shared/types/models-interfaces';
import {HttpClientService} from '../shared/services/http-client.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClientService) {
  }

  login(payload: LoginPayloadInterface) {
    return this.http.post<User, LoginPayloadInterface>('auth/login', payload);
  }
}

import {Injectable} from '@angular/core';
import {HttpClientService} from '../../services/http-client.service';
import {User} from '../../types/models-interfaces';
import {Observable} from 'rxjs';
import {LoginPayloadInterface} from "../../../auth/login/types/login-payload.interface";
import {RegisterPayloadInterface} from "../../../auth/register/types/register-payload.interface";
import {ResetPasswordRequestPayloadInterface} from "../../../auth/reset-password-request/types/reset-password-request-payload.interface";
import {ResetPasswordPayloadInterface} from "../../../auth/reset-password/types/reset-password-payload.interface";
import {ProfilePayloadInterface} from "../../../auth/profile/types/profile-payload.interface";

@Injectable({
  providedIn: 'root',
})
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

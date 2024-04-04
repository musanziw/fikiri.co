import {Injectable} from '@angular/core';
import {HttpClientService} from '../shared/services/http-client.service';
import {User} from '../shared/types/models-interfaces';
import {Observable} from 'rxjs';
import {LoginInterface} from "./login/types/login.interface";
import {RegisterInterface} from "./register/types/register.interface";
import {ResetPasswordRequestInterface} from "./reset-password-request/types/resetPasswordRequest.interface";
import {ResetPasswordInterface} from "./reset-password/types/resetPassword.interface";
import {UpdateProfileInterface} from "./profile/types/update-profile.interface";

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

  updateProfile(payload: UpdateProfileInterface): Observable<User> {
    return this.http.patch<User, UpdateProfileInterface>('auth/profile', payload);
  }

  login(payload: LoginInterface): Observable<User> {
    return this.http.post<User, LoginInterface>('auth/login', payload);
  }

  updateImage(userId: number | undefined, file: FormData): Observable<null> {
    if (!userId) return new Observable<null>();
    return this.http.post<null, FormData>(`users/${userId}/image`, file);
  }

  resetPasswordRequest(payload: ResetPasswordRequestInterface): Observable<null> {
    return this.http.post<null, ResetPasswordRequestInterface>('auth/reset-password-request', payload);
  }

  resetPassword(payload: ResetPasswordInterface): Observable<null> {
    return this.http.post<null, ResetPasswordInterface>('auth/reset-password', payload);
  }

  logout(): Observable<null> {
    return this.http.post<null, {}>('auth/logout', {});
  }
}

import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../shared/services/http-client.service';
import { InfoPayloadInterface } from '../types/info-payload.interface';
import { Observable } from 'rxjs';
import { User } from '../../../shared/types/models-interfaces';
import { PasswordPayloadInterface } from '../types/password-payload.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private httpClient: HttpClientService) {}

  updateProfile(payload: InfoPayloadInterface): Observable<User> {
    return this.httpClient.patch<User, InfoPayloadInterface>('auth/profile', payload);
  }

  updateImage(userId: number | undefined, file: FormData): Observable<void> {
    if (!userId) return new Observable<void>();
    return this.httpClient.uploadFile(`users/${userId}/image`, file);
  }

  updatePassword(payload: PasswordPayloadInterface): Observable<null> {
    return this.httpClient.patch<null, PasswordPayloadInterface>('auth/update-password', payload);
  }
}

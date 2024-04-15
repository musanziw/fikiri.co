import {Injectable} from "@angular/core";
import {HttpClientService} from "../../../shared/services/http-client.service";
import {ProfilePayloadInterface} from "../types/profile-payload.interface";
import {Observable} from "rxjs";
import {User} from "../../../shared/types/models-interfaces";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private httpClient: HttpClientService) {
  }

  updateProfile(payload: ProfilePayloadInterface): Observable<User> {
    return this.httpClient.patch<User, ProfilePayloadInterface>('auth/profile', payload);
  }

  updateImage(userId: number | undefined, file: FormData): Observable<null> {
    if (!userId) return new Observable<null>();
    return this.httpClient.post<null, FormData>(`users/${userId}/image`, file);
  }
}

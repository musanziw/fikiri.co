import {Injectable} from '@angular/core';
import {HttpClientService} from '../../../shared/services/http-client.service';
import {Observable} from 'rxjs';
import {Call} from "../../../shared/types/models-interfaces";

@Injectable({
  providedIn: 'root',
})
export class RecentCallService {
  constructor(private http: HttpClientService) {
  }

  getRecent(): Observable<Call> {
    return this.http.get<Call>('calls/recent/one');
  }
}

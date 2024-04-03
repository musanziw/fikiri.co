import {Injectable} from '@angular/core';
import {HttpClientService} from '../shared/services/http-client.service';
import {Observable} from 'rxjs';
import {CallResponseInterface} from './types/call-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  constructor(private http: HttpClientService) {
  }

  getCall(id: number): Observable<CallResponseInterface> {
    return this.http.get<CallResponseInterface>('calls/' + id);
  }
}

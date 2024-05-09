import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../../shared/services/http-client.service';
import { Event } from '../../../../shared/types/models-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallsService {
  constructor(private httpClient: HttpClientService) {}

  getCalls(): Observable<Event[]> {
    return this.httpClient.get<Event[]>('events');
  }
}

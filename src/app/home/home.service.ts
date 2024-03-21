import { Injectable } from '@angular/core';
import { Solution } from '../shared/types/models-interfaces';
import { HttpClientService } from '../shared/services/http-client.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClientService) {}

  getAwardSolutions() {
    return this.http.get<Solution[]>('solutions/mapped/all?cursor=1');
  }
}

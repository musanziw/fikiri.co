import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../../shared/services/http-client.service';
import { Solution } from '../../../../shared/types/models-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WinningSolutionsService {
  constructor(private http: HttpClientService) {}

  getWinningSolutions(): Observable<Solution[]> {
    return this.http.get<Solution[]>('solutions/mapped?cursor=1');
  }
}

import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../../shared/services/http-client.service';
import { TotalsInterface } from '../types/totals.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private httpClient: HttpClientService) {}

  getCount(): Observable<TotalsInterface> {
    return this.httpClient.get<TotalsInterface>('dashboard');
  }
}

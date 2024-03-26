import { Injectable } from '@angular/core';
import { Solution } from '../../shared/types/models-interfaces';
import { HttpClientService } from '../../shared/services/http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolutionService {
  constructor(private http: HttpClientService) {}

  getSolution(id: number): Observable<Solution> {
    return this.http.get<Solution>(`solutions/${id}`);
  }
}

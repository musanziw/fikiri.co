import { Injectable } from '@angular/core';
import { Solution } from '../../shared/types/models-interfaces';
import { HttpClientService } from '../../shared/services/http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolutionsService {
  constructor(private http: HttpClientService) {}

  getSolutions(cursor: number = 0): Observable<Solution[]> {
    return this.http.get<Solution[]>(`solutions/mapped?cursor=${cursor}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClientService } from '../../shared/services/http-client.service';
import { Observable } from 'rxjs';
import { SolutionResponseInterface } from '../types/solution-response.interface';
import { Solution } from '../../shared/types/models-interfaces';

@Injectable()
export class SolutionService {
  constructor(private http: HttpClientService) {}

  getSolution(id: number): Observable<SolutionResponseInterface> {
    return this.http.get<SolutionResponseInterface>(`solutions/${id}`);
  }

  uploadImage(solutionId: number | undefined, file: FormData): Observable<Solution> {
    return this.http.post<Solution, FormData>(`solutions/image/${solutionId}`, file);
  }
}

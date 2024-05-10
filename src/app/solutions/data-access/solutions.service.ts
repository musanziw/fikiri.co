import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SolutionsReponseInterface } from '../types/solutions-response.interface';
import { HttpClientService } from '../../shared/services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class SolutionsService {
  constructor(private http: HttpClientService) {}

  getSolutions(page: number = 1): Observable<SolutionsReponseInterface> {
    return this.http.get<SolutionsReponseInterface>(`solutions/mapped?page=${page}`);
  }
}

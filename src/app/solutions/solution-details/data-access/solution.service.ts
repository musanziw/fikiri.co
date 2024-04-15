import {Injectable} from '@angular/core';
import {HttpClientService} from '../../../shared/services/http-client.service';
import {Observable} from 'rxjs';
import {SolutionResponseInterface} from "../types/solution-response.interface";

@Injectable({
  providedIn: 'root',
})
export class SolutionService {
  constructor(private http: HttpClientService) {
  }

  getSolution(id: number): Observable<SolutionResponseInterface> {
    return this.http.get<SolutionResponseInterface>(`solutions/mapped/one/${id}`);
  }

}

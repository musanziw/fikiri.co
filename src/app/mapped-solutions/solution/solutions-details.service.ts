import {Injectable} from '@angular/core';
import {Solution} from '../../shared/types/models-interfaces';
import {environment} from '../../../environments/environment';
import {HttpClientService} from "../../shared/services/http-client.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SolutionsService {
  url: string = environment.apiUrl;

  constructor(private http: HttpClientService) {
  }

  getSolution(id: string): Observable<{ data: Solution }> {
    return this.http.get<Solution>(`${this.url}/solutions/${id}`);
  }
}

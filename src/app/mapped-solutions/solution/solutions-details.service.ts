import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Solution} from '../../shared/types/models-interfaces';
import {environment} from '../../../environments/environment';
import {HttpClientService} from "../../shared/services/http-client.service";

@Injectable({
  providedIn: 'root',
})
export class SolutionsService {
  cursor: number = 1;
  url: string = environment.apiUrl;

  constructor(private http: HttpClientService) {
  }


  getSolution(id: string) {
    return this.http.get<Solution>(`${this.url}/solutions/${id}`);
  }
}

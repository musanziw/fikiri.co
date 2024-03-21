import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Solution } from '../../shared/types/models-interfaces';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolutionsService {
  cursor: number = 1;
  url: string = environment.apiUrl;
  http = inject(HttpClient);

  getMappedSolutions() {
    return this.http.get<Observable<{ data: Solution[] }>>(
      `${this.url}/solutions/mapped/all?cursor=${this.cursor}`
    );
  }

  getSolution(id: string) {
    return this.http.get<{ data: Solution }>(`${this.url}/solutions/${id}`);
  }
}

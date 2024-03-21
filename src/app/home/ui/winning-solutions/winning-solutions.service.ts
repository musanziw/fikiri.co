import {Injectable} from '@angular/core';
import {HttpClientService} from '../../../shared/services/http-client.service';
import {Solution} from '../../../shared/types/models-interfaces';

@Injectable({
  providedIn: 'root',
})
export class WinningSolutionsService {
  constructor(private http: HttpClientService) {
  }

  getWinningSolutions() {
    return this.http.get<Solution[]>('solutions/mapped/all?cursor=1');
  }
}

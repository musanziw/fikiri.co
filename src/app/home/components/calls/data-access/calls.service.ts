import {Injectable} from "@angular/core";
import {HttpClientService} from "../../../../shared/services/http-client.service";
import {Call} from "../../../../shared/types/models-interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CallsService {
  constructor(private httpClient: HttpClientService) {
  }

  getCalls(): Observable<Call[]> {
    return this.httpClient.get<Call[]>('calls');
  }
}

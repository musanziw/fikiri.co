import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginPayloadInterface} from "../types/login-payload.interface";
import {User} from "../../shared/types/models-interfaces";
import {environment} from "../../../environments/environment";
import {ApiRequestsService} from "../../shared/services/api-requests.service";

@Injectable({
  providedIn: 'root'
})
export class AuhtService {
  apiRequestsService = inject(ApiRequestsService)

  login(payload: LoginPayloadInterface) {
    return this.apiRequestsService.post<User, LoginPayloadInterface>("auth/login", payload)
  }

  isAuthenticate() {
    return this.apiRequestsService.get<boolean>("auth/is-authenticated")
  }

  getCurrentUser() {
    return this.apiRequestsService.get<User>("auth/profile")
  }

}

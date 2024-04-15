import {User} from '../../types/models-interfaces';
import {ApiValiationsErrorsInterface} from "./api-valiations-errors.interface";

export interface AuthStoreInterface {
  user: User | null;
}

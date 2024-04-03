import {User} from '../../shared/types/models-interfaces';
import {ApiValiationsErrorsInterface} from "./api-valiations-errors.interface";

export interface AuthStoreInterface {
  isLoading: boolean
  user: User | null;
  error: string | null
  validationErrors: ApiValiationsErrorsInterface[]
}

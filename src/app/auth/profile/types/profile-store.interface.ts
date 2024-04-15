import {ApiValiationsErrorsInterface} from "../../../shared/auth/types/api-valiations-errors.interface";

export interface ProfileStoreInterface {
  isLoading: boolean
  success: string | null
  error: string | null
  validationErrors: ApiValiationsErrorsInterface[]
}

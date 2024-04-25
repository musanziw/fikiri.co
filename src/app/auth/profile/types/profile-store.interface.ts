import { ApiValiationsErrorsInterface } from '../../../shared/auth/types/api-valiations-errors.interface';

export interface ProfileStoreInterface {
  isUpdatingInfo: boolean;
  isUpdatingPassword: boolean;
  infoUpdateSuccess: string | null;
  passwordUpdateSucess: string | null;
  infoUpdateError: string | null;
  passwordUpdateError: string | null;
  isUpdatingImage: boolean;
  updateImageSuccess: string | null;
  updateImageError: string | null;
  validationErrors: ApiValiationsErrorsInterface[];
}

import { ApiValiationsErrorsInterface } from '../../../shared/auth/types/api-valiations-errors.interface';
import { MessageInterface } from '../../../shared/auth/types/message.interface';

export interface ProfileStoreInterface {
  isUpdatingInfo: boolean;
  isUpdatingPassword: boolean;
  infoUpdateMessage: MessageInterface;
  passwordUpdateMessage: MessageInterface;
  isUpdatingImage: boolean;
  updateImageMessage: MessageInterface;
  validationErrors: ApiValiationsErrorsInterface[];
}

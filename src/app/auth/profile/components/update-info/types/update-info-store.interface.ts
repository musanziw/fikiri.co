import { ApiValiationsErrorsInterface } from '../../../../../shared/auth/types/api-valiations-errors.interface';
import { MessageInterface } from '../../../../../shared/auth/types/message.interface';

export interface UpdateInfoStoreInterface {
  isLoading: boolean;
  message: MessageInterface;
  errors: ApiValiationsErrorsInterface[];
}

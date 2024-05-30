import { MessageInterface } from '../../../../../shared/auth/types/message.interface';
import { Solution } from '../../../../../shared/types/models-interfaces';

export interface UserInfoStoreInterface {
  isLoading: boolean;
  message: MessageInterface;
  solutions: Solution[];
}

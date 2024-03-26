import {User} from '../../types/models-interfaces';

export interface AuthStoreInterface {
  isLoading: boolean
  user: User | null;
  error: string | null;
}

import { CallResponseInterface } from './call-response.interface';

export interface CallStoreInterface {
  isLoading: boolean;
  callResponse: CallResponseInterface | null;
  error: string | null;
}

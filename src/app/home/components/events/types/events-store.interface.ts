import { Event } from '../../../../shared/types/models-interfaces';

export interface CallsStoreInterface {
  isLoading: boolean;
  calls: Event[];
  error: string | null;
}

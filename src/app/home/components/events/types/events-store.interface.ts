import { Event } from '../../../../shared/types/models-interfaces';

export interface EventsStoreInterface {
  isLoading: boolean;
  events: Event[];
  error: string | null;
}

import { Event, Solution, Thematic } from '../../shared/types/models-interfaces';

export interface SolutionsStoreInterface {
  isLoading: boolean;
  count: number;
  solutions: Solution[];
  events: Event[];
  thematics: Thematic[];
  error: string | null;
}

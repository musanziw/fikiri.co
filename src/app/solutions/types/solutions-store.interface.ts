import { Event, Solution, Thematic } from '../../shared/types/models-interfaces';
import { SearchResponseInterface } from './search-response.interface';

export interface SolutionsStoreInterface {
  isLoading: boolean;
  isFiltering: boolean;
  count: number;
  solutions: Solution[];
  searchResults: SearchResponseInterface | null;
  events: Event[];
  thematics: Thematic[];
  error: string | null;
}

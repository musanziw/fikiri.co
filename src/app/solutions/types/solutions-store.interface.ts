import { Solution, Thematic } from '../../shared/types/models-interfaces';

export interface SolutionsStoreInterface {
  isLoading: boolean;
  count: number;
  solutions: Solution[];
  thematics: Thematic[];
  error: string | null;
}

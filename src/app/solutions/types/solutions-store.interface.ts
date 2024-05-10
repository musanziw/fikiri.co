import { Solution } from '../../shared/types/models-interfaces';

export interface SolutionsStoreInterface {
  isLoading: boolean;
  count: number;
  solutions: Solution[];
  error: string | null;
}

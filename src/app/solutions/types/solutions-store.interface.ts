import { Solution } from '../../shared/types/models-interfaces';

export interface SolutionsStoreInterface {
  cursor: number;
  isLoading: boolean;
  isLoadingMore: boolean;
  solutions: Solution[];
  error: string | null;
}

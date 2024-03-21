import {Solution} from '../../../shared/types/models-interfaces';

export interface SolutionsStoreInterface {
  cursor: number;
  isLoading: boolean;
  solutions: Solution[];
  error: string | null;
}

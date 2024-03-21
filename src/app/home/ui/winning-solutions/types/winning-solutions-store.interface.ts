import { Solution } from '../../../../shared/types/models-interfaces';

export interface WinningSolutionsStoreInterface {
  isLoading: boolean;
  solutions: Solution[];
  error: string | null;
}

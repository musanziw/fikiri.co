import {Solution} from '../../../shared/types/models-interfaces';

export interface SolutionStoreInterface {
  isLoading: boolean;
  solution: Solution | null;
  error: string | null;
  prev: number | null;
  next: number | null;
}

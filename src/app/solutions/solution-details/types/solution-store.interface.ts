import {Solution} from '../../../shared/types/models-interfaces';
import {PrevAndNextInterface} from "./prev-and-next.interface";

export interface SolutionStoreInterface {
  isLoading: boolean;
  solution: Solution | null;
  error: string | null;
  prevAndNext: PrevAndNextInterface | null;
}

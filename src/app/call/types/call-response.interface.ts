import { Call } from '../../shared/types/models-interfaces';

export interface CallResponseInterface {
  call: Call;
  prev: number | null;
  next: number | null;
}

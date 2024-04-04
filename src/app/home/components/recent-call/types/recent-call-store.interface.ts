import {Call} from "../../../../shared/types/models-interfaces";

export interface RecentCallStoreInterface {
  isLoading: boolean;
  call: Call | null;
  error: string | null;
}

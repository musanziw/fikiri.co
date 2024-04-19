import {Call} from "../../../../shared/types/models-interfaces";

export interface CallsStoreInterface {
  isLoading: boolean
  calls: Call[]
  error: string | null
}

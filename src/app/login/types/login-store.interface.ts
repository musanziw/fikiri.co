import {User} from "../../shared/types/models-interfaces";

export interface LoginStoreInterface {
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

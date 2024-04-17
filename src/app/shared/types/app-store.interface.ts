import {AuthStoreInterface} from '../auth/types/auth-store.interface';
import {TopbarStoreInterface} from "../components/topbar/types/topbar-store.interface";

export interface AppStoreInterface {
  auth: AuthStoreInterface;
  topbar: TopbarStoreInterface;
}

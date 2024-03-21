import {WinningSolutionsStoreInterface} from '../../home/ui/winning-solutions/types/winning-solutions-store.interface';
import {SolutionsStoreInterface} from '../../mapped-solutions/solutions/types/solutions-store.interface';
import {AuthStoreInterface} from '../auth/types/auth-store.interface';

export interface AppStoreInterface {
  auth: AuthStoreInterface;
  winningSolutions: WinningSolutionsStoreInterface;
  solutions: SolutionsStoreInterface;
}

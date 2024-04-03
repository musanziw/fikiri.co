import { WinningSolutionsStoreInterface } from '../../home/components/winning-solutions/types/winning-solutions-store.interface';
import { SolutionStoreInterface } from '../../solutions/solution-details/types/solution-store.interface';
import { SolutionsStoreInterface } from '../../solutions/solutions-list/types/solutions-store.interface';
import { AuthStoreInterface } from '../../auth/types/auth-store.interface';

export interface AppStoreInterface {
  auth: AuthStoreInterface;
  winningSolutions: WinningSolutionsStoreInterface;
  solutions: SolutionsStoreInterface;
  solution: SolutionStoreInterface;
}

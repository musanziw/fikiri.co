import { Solution } from "@/app/shared/models/Solution";
import { Thematic } from "@/app/shared/models/Thematic";

export interface Challenge {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  solutions?: Solution[];
  thematics?: Thematic[];
}

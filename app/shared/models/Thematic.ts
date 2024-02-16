import { Call } from "@/app/shared/models/Call";
import { Solution } from "@/app/shared/models/Solution";
import { Challenge } from "@/app/shared/models/Challenge";

export interface Thematic {
  id: number;
  name: string;
  odds: string;
  createdAt: Date;
  updatedAt: Date;
  solutions?: Solution[];
  calls?: Call[];
  challenges?: Challenge[];
}

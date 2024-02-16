import { Solution } from "@/app/shared/models/Solution";

export interface Status {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  solutions?: Solution[];
}

import { Solution } from "@/app/shared/models/Solution";

export interface SolutionImages {
  id: number;
  imageLink: string;
  solution?: Solution;
  solutionId: number;
  createdAt: Date;
  updatedAt: Date;
}

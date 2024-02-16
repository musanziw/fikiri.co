import { User } from "@/app/shared/models/User";

export interface Role {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  users?: User[];
}

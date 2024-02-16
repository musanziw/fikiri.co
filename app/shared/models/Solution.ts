import { Status } from "@/app/shared/models/Status";
import { Call } from "@/app/shared/models/Call";
import { Thematic } from "@/app/shared/models/Thematic";
import { User } from "@/app/shared/models/User";
import { SolutionImages } from "@/app/shared/models/SolutionImages";
import { Challenge } from "@/app/shared/models/Challenge";

export interface Solution {
  id: number;
  name: string;
  videoLink: string;
  description: string;
  callId: number;
  thematicId: number;
  targetedProblem: string;
  statusId: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  call?: Call;
  status: Status;
  thematic?: Thematic;
  user?: User;
  challenges?: Challenge;
  images: SolutionImages[];
}

export interface Call {
  id: number;
  name: string;
  startedAt: Date;
  endedAt: Date;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  solutions?: Solution[];
  thematics: Thematic[];
}

export interface Role {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  users?: User[];
}

export interface Solution {
  id: number;
  name: string;
  videoLink: string;
  imageLink: string;
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
  challenges?: Challenge[];
  images: SolutionImages[];
}

export interface SolutionImages {
  id: number;
  imageLink: string;
  solution?: Solution;
  solutionId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Status {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  solutions?: Solution[];
}

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

export interface Challenge {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  solutions?: Solution[];
  thematics?: Thematic[];
}

export interface User {
  id: number;
  email: string;
  name: string;
  password?: string;
  phoneNumber?: string;
  address?: string;
  token?: string;
  googleImage?: string;
  profile?: string;
  createdAt: Date;
  updatedAt: Date;
  solutions?: Solution[];
  roles: Role[];
}

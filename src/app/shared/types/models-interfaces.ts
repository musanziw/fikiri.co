export interface Event {
  id: number;
  name: string;
  started_at: Date;
  ended_at: Date;
  description: string;
  created_at: Date;
  updated_at: Date;
  images: Image[];
  solutions?: Solution[];
  thematics: Thematic[];
}

export interface Role {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  users?: User[];
}

export interface Solution {
  id: number;
  name: string;
  video_link: string;
  image_link: string;
  description: string;
  targeted_problem: string;
  created_at: Date;
  updated_at: Date;
  call: Event;
  status: Status;
  thematic: Thematic;
  user: User;
  challenges: Challenge[];
  images: Image[];
}

export interface Image {
  id: number;
  image_link: string;
  created_at: Date;
  updated_at: Date;
}

export interface Status {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Thematic {
  id: number;
  name: string;
  odds: string;
  created_at: Date;
  updated_at: Date;
  solutions: Solution[];
  calls: Event[];
  challenges: Challenge[];
}

export interface Challenge {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  solutions: Solution[];
  thematics: Thematic[];
}

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  phone_number: string;
  address: string;
  token: string;
  google_image: string;
  profile: string;
  created_at: Date;
  updated_at: Date;
  solutions: Solution[];
  roles: Role[];
}

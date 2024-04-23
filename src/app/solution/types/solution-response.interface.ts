import {Solution} from "../../shared/types/models-interfaces";

export interface SolutionResponseInterface {
  solution: Solution | null,
  prev: number | null,
  next: number | null,
}

import {Solution} from "@/app/shared/models/Solution";
import {Thematic} from "@/app/shared/models/Thematic";

export interface Call {
    id: number
    name: string
    startedAt: Date
    endedAt: Date
    description: string
    createdAt: Date
    updatedAt: Date
    solutions?: Solution[]
    thematics: Thematic[]
}
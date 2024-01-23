import {Role} from "@/app/shared/models/Role";
import {Solution} from "@/app/shared/models/Solution";

export interface User {
    id: number
    email: string
    name: string
    password?: string
    phoneNumber?: string
    address?: string
    token?: string
    googleImage?: string
    profile?: string
    createdAt: Date
    updatedAt: Date
    solutions?: Solution[]
    roles: Role[]
}
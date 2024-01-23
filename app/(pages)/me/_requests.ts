import {api} from "@/app/shared/config/api";
import {Solution} from "@/app/shared/models/Solution";

const loadSolutions = async (email: string) => {
    const {data} = await api.get(`solutions/user/${email}`)
    return data.data as Solution[]
}

const updateUser = async <T>(userId: number, payload: T) => {
    const {data} = await api.patch(`auth/profile/${userId}`, payload)
    return data
}

export {loadSolutions, updateUser}
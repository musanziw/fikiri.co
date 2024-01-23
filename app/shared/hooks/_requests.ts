import {api} from "@/app/shared/config/api";
import {User} from "@/app/shared/models/User";

const getUser = async (userId: number) => {
    const response = await api.get(`users/${userId}`)
    return response.data.data as User
}

const checkAuth = async () => {
    const {data} = await api.get('auth/profile')
    return getUser(data.data.id)
}

export {checkAuth, getUser}
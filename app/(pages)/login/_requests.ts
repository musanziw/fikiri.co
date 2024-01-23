import {api} from "@/app/shared/config/api";
import {User} from "@/app/shared/models/User";

const login = async <T>(payload: T) => {
    const res = await api.post('auth/login', payload)
    return res.data.data as User
}

export {login}
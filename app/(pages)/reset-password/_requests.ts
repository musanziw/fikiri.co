import {api} from "@/app/shared/config/api";

const resetPassword = async <T>(payload: T) => {
    const res = await api.post('auth/reset-password', payload)
    return res.data
}

export {resetPassword}
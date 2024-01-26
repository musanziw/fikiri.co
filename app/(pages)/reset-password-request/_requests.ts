import {api} from "@/app/shared/config/api";

const resetPasswordRequest = async <T>(payload: T) => {
    const res = await api.post('auth/reset-password-request', payload)
    return res.data.data
}

export {resetPasswordRequest}
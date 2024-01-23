import {api} from "@/app/shared/config/api";

const register = async <T>(payload: T) => await api.post("auth/register", payload);

export {register};
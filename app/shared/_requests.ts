import {api, apiBaseURL} from "@/app/shared/config/api";

const getOne = async (uri: string) => {
    const {data: res} = await api.get(uri);
    return res.data
}

const getMany = async (uri: string) => {
    const {data: res} = await api.get(uri);
    return res.data
}

const patch = async <T>(uri: string, payload: T) => {
    const {data: res} = await api.patch(uri, payload)
    return res.data
}

const post = async <T>(uri: string, payload: T) => {
    const {data: res} = await api.post(uri, payload)
    return res.data
}

const googleAuth = () => window.location.replace(`${apiBaseURL}auth/google/redirect`);

export {getOne, getMany, patch, post, googleAuth}



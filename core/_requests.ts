import {api, apiBaseURL} from "@/core/config/api";

const get = async <T>(uri: string) => {
    const {data: res} = await api.get(uri);
    return res.data as T;
};

const patch = async <T, U>(uri: string, payload: T) => {
    const {data: res} = await api.patch(uri, payload);
    return res.data as U;
};

const post = async <T, U>(uri: string, payload: T) => {
    const {data: res} = await api.post(uri, payload);
    return res.data as U;
};

const googleAuth = () => window.location.replace(`${apiBaseURL}auth/google/redirect`);

export {get, patch, post, googleAuth};

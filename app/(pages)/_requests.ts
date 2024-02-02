import {apiBaseURL} from "@/app/shared/config/api";

const googleAuth = () => window.location.replace(`${apiBaseURL}auth/google/redirect`);

export {googleAuth}
import axios from "axios";

// const apiBaseURL: string = "http://localhost:8000/";
const imgPath: string = "https://api.fikiri.co/uploads/";
const apiBaseURL: string = "https://api.fikiri.co/";

const api = axios.create({
    baseURL: apiBaseURL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export {api, apiBaseURL, imgPath};

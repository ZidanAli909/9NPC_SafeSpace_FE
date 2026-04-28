import axios from "axios";

export const api = axios.create({
    baseURL: "https://safespacebackend.vercel.app",
});

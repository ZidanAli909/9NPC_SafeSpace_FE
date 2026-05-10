import { api } from "./API";

export const AuthService = {
    login: async (payload) => {
        const response = await api.post("/auth/sign-in", payload);
        return response.data;
    },
    register: async (payload) => {
        const response = await api.post("/auth/sign-up", payload);
        return response.data;
    },
    getSession: async () => {
        const response = await api.get("/auth/session");
        return response.data;
    }
}

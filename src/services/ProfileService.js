import { api } from "./API";

export const ProfileService = {
    getProfile: async (token) => {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await api.get("/user/profile/", { headers });
        return response.data;
    },
};
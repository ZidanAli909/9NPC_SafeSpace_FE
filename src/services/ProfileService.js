import { api } from "./API";

export const ProfileService = {
    getProfile: async () => {
        const response = await api.get("/user/profile/");
        return response.data;
    },
    updateProfile: async (data) => {
        const response = await api.patch("/user/profile/", data);
        return response.data;
    },
    updateAdminProfile: async (data) => {
        const response = await api.patch("/admin/profile", data);
        return response.data;
    }
};
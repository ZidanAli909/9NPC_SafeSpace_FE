import { api } from "./API";

export const ProfileService = {
    getProfile: async () => {
        const response = await api.get(`/user/profile/`);
        return response.data;
    },
};
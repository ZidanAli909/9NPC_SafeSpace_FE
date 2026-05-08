import { api } from "./API";

export const AdminService = {
    getAdminProfile: async (token) => {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await api.get("/admin/profile", { headers });
        return response.data;
    },
}
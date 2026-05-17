import { api } from "./API";

export const AdminService = {
    getAdminProfile: async (token) => {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await api.get("/admin/profile", { headers });
        return response.data;
    },

    getReports: async (token) => {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await api.get("/admin/report");
        return response.data;
    },
    
    getReport: async (id, token) => {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await api.get(`/admin/report/${id}`);
        return response.data;
    },
}
import { api, headerAuth } from "./API";

export const AdminService = {
    getAdminProfile: async () => {
        const response = await api.get("/admin/profile");
        return response.data;
    },

    getDashboardStats: async () => {
        const response = await api.get("/admin/dashboard/stats");
        return response.data;
    },

    getDashboardCategories: async () => {
        const response = await api.get("/admin/dashboard/categories");
        return response.data;
    },

    getDashboardReports: async () => {
        const response = await api.get("/admin/report/recent");
        return response.data;
    },

    getReports: async () => {
        const response = await api.get("/admin/reports");
        // const response = await api.get("/admin/report");
        return response.data;
    },
    
    getReport: async (id) => {
        const response = await api.get(`/admin/report/${id}`);
        return response.data;
    },

    updateReportStatus: async (id, dataStatus) => {
        const response = await api.patch(`/admin/report/${id}/status`, { status: dataStatus });
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
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
        const response = await api.get("/admin/reports/recent");
        return response.data;
    },

    getReports: async (params = {}) => {
        const response = await api.get("/admin/reports", { params });
        return response.data; // Needs data and pagination
    },
    
    getReport: async (id) => {
        const response = await api.get(`/admin/report/${id}`);
        return response.data;
    },

    updateReportStatus: async (id, dataStatus) => {
        const response = await api.patch(`/admin/report/${id}/status`, { status: dataStatus });
        return response.data;
    },
}
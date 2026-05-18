import { api, headerAuth } from "./API";

export const AdminService = {
    getAdminProfile: async () => {
        const response = await api.get("/admin/profile");
        return response.data;
    },

    getReports: async () => {
        const response = await api.get("/admin/report");
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
}
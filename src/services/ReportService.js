import { api } from "./API";

export const ReportService = {
    readAllUserReports: async () => {
        const response = await api.get("/report");
        return response.data;
    },
    readUserReport: async (id) => {
        const response = await api.get(`/report/${id}`);
        return response.data;
    },
}
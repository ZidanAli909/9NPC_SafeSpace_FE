import { api } from "./API";
import axios from "axios";

export const ReportService = {
    uploadEvidence: async (file) => {
        const signedUrlRes = await api.post("/report/evidence/upload-url", {
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type
        });

        const { uploadUrl, path } = signedUrlRes.data.data;

        await axios.put(uploadUrl, file, {
            headers: { "Content-Type": file.type }
        });

        return path;
    },

    createReport: async (reportData) => {
        const response = await api.post("/report/create", reportData);
        return response.data;
    },

    readAllUserReports: async () => {
        const response = await api.get("/report");
        return response.data;
    },

    readUserReport: async (id) => {
        const response = await api.get(`/report/${id}`);
        return response.data;
    },

    cancelReport: async (id) => {
        const response = await api.post(`/report/${id}`);
        return response.data;
    },
}
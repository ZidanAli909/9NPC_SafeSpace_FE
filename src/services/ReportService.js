import { api } from "./API";
import axios from "axios";

export const ReportService = {
  uploadEvidence: async (file) => {
    try {
      const signedUrlRes = await api.post(
        "/report/evidence/upload-url",
        {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
        }
      );

      const { uploadUrl, filePath } = signedUrlRes.data.data;

      await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      return filePath;
    } catch (error) {
      console.error("Upload evidence gagal:", error);
      throw error;
    }
  },

  createReport: async (reportData) => {
    try {
      const response = await api.post("/report/create", reportData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  readAllUserReports: async () => {
    const response = await api.get("/report");
    return response.data;
  },

  readUserReport: async (id) => {
    const response = await api.get(`/report/${id}`);
    return response.data;
  },
};
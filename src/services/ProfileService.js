import { api } from "./API";

export const ProfileService = {
    getProfile: async (token) => {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await api.get("/user/profile/", { headers });
        return response.data;
    },
    updateProfile: async (data, token) => {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await api.patch("/user/profile/", data, { headers });
        return response.data;
    },
    uploadProfilePicture: async (file, token) => {
        const tokenHeader = token ? { Authorization: `Bearer ${token}` } : {};
        const signedUrlRes = await api.post("/user/profile-picture/upload-url", {
              fileName: file.name,
              fileSize: file.size,
              fileType: file.type
        }, { tokenHeader });
        const { uploadUrl, filePath } = signedUrlRes.data.data;

        const fileHeader = file ? { headers: { "Content-Type": file.type } } : {};
        await api.put(uploadUrl, file, { fileHeader });

        return filePath;
    },
    updateAdminProfile: async (data, token) => {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await api.patch("/admin/profile", data, { headers });
        return response.data;
    },
    uploadAdminProfilePicture: async (file, token) => {
        const tokenHeader = token ? { Authorization: `Bearer ${token}` } : {};
        const signedUrlRes = await api.post("/admin/profile-picture/upload-url", {
              fileName: file.name,
              fileSize: file.size,
              fileType: file.type
        }, { tokenHeader });
        const { uploadUrl, filePath } = signedUrlRes.data.data;

        const fileHeader = file ? { headers: { "Content-Type": file.type } } : {};
        await api.put(uploadUrl, file, { fileHeader });

        return filePath;
    }
};
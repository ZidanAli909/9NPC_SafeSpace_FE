import { api, headerAuth, storageApi } from "./API";
import { supabase } from "./Supabase";

// NOTA: Ini untuk User dan Admin!

export const ProfilePictureService = {
    deleteProfilePicture: async (role) => {
        const URL = role === "ADMIN" ? "/admin/profile-picture" : "/user/profile-picture";
        const response = await api.delete(URL);
        return response.data;
    },

    uploadProfilePicture: async (file, role) => {
        let uploadUrl, path, token;
        // STEP 1: Dapatkan signed upload URL dari Supabase
        try {
            const URL1 = role === "ADMIN" ? "/admin/profile-picture/upload-url" : "/user/profile-picture/upload-url";
            const signedUrlRes = await api.post(URL1, {
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type
            });
            // console.log("Response data:", signedUrlRes.data.data);
            ({ uploadUrl, path, token } = signedUrlRes.data.data);
        } catch (error) {
            console.error("Error getting signed upload URL", error);
            throw error;
        }
        // STEP 2: Upload file ke Supabase
        try {
            // profile_pictures User dan Admin ada di satu bucket
            const { error } = await supabase.storage.from('profile_pictures').uploadToSignedUrl(path, token, file);
            if (error) throw error;
        } catch (error) {
            console.error("Error uploading file to the server", error);
            throw error;
        }
        // STEP 3: Ganti path foto profil lama dengan baru
        try {
            const URL2 = role === "ADMIN" ? "/admin/profile-picture" : "/user/profile-picture";
            const payload = { profilePicturePath: path };
            // console.log("payload:", JSON.stringify(payload));
            await api.patch(URL2, payload);
        } catch (error) {
            console.error("Error updating profile picture's path", error);
            throw error;
        }
    },
};
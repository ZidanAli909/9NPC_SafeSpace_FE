import { ProfileService } from "@/services/ProfileService";
import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { AdminService } from "@/services/AdminService";

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
    const { isAuthenticated, user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);

    const userId = user?.id;
    const userRole = user?.user_metadata?.role;

    const fetchProfile = useCallback(async () => {
        if (!isAuthenticated || !user) {
            setLoadingProfile(false);
            return;
        }
        setLoadingProfile(true);
        try {
            let response;
            if (userRole === "ADMIN") response = await AdminService.getAdminProfile();
            else response = await ProfileService.getProfile();
            setProfile(response.data);
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            setProfile(null);
        } finally {
            setLoadingProfile(false);
        }
    }, [isAuthenticated, userId, userRole]);

    useEffect(() => {
        if (isAuthenticated) fetchProfile();
        else {
            setProfile(null);
            setLoadingProfile(false);
        }
    }, [isAuthenticated, fetchProfile]);

    const value = {
        profile,
        loadingProfile,
        refreshProfile: fetchProfile,
        role: userRole // Easy access to role
    };

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error("useProfile must be used within a ProfileProvider");
    }
    return context;
};
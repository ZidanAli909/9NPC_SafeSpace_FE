import { ProfileService } from "@/services/ProfileService";
import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(false);

    const fetchProfile = useCallback(async () => {
        if (!isAuthenticated) return;

        setLoadingProfile(true);
        try {
            const response = await ProfileService.getProfile();
            setProfile(response.data);
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            setProfile(null);
        } finally {
            setLoadingProfile(false);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) fetchProfile();
        else setProfile(null);
    }, [isAuthenticated, fetchProfile]);

    const value = {
        profile,
        loadingProfile,
        refreshProfile: fetchProfile, // Export this so you can refresh after an update
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
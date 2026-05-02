import { AdminService } from "@/services/AdminService";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

// NOTE: Admin is a mix of AuthContext and ProfileContext!
const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loadingAdmin, setLoadingAdmin] = useState(true);

    const fetchAdminProfile = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoadingAdmin(false);
            return;
        }
        try {
            const response = await AdminService.getAdminProfile();
            if (response.success) {
                setAdmin(response.data);
            }
        } catch (error) {
            setAdmin(null);
            adminLogout(); // Clean-up for extra measure
        } finally {
            setLoadingAdmin(false);
        }
    };

    useEffect(() => {
        fetchAdminProfile();
    }, []);

    const adminLogin = (data, token) => {
        // localStorage.setItem("token", token); Login Page will do it.
        setAdmin(data);
    }

    const adminLogout = () => {
        localStorage.removeItem("token");
    }

    const value = {
        admin,
        isAdmin: !!admin,
        loadingAdmin,
        adminLogin,
        adminLogout
    }; 

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
}

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("useAdmin must be used within a AdminProvider");
    }
    return context;
}
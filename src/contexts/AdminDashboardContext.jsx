import { AdminService } from "@/services/AdminService";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const AdminDashboardContext = createContext(null);

export const AdminDashboardProvider = ({ children }) => {
    const [recentReports, setRecentReports] = useState([]);
    const [categories, setCategories] = useState([]);
    const [stats, setStats] = useState(null);
    const [loadingDashboard, setLoadingDashboard] = useState(false);

    const fetchDashboard = useCallback(async () => {
        setLoadingDashboard(true);
        try {
            const responseStats = await AdminService.getDashboardStats();
            setStats(responseStats.data);
            const responseCategories = await AdminService.getDashboardCategories();
            setCategories(responseCategories.data);
            const responseReports = await AdminService.getDashboardReports();
            setRecentReports(responseReports.data);
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
        } finally {
            setLoadingDashboard(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    const values = {
        recentReports,
        categories,
        stats,
        loadingDashboard,
    };
    
    return (
        <AdminDashboardContext.Provider value={values}>
            {children}
        </AdminDashboardContext.Provider>
    );
}

export const useAdminDashboard = () => {
    const context = useContext(AdminDashboardContext);
    if (!context) {
        throw new Error("useAdminDashboard must be used within a AdminDashboardProvider");
    }
    return context;
}
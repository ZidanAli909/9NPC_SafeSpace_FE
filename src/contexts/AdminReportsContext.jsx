import { AdminService } from "@/services/AdminService";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const AdminReportsContext = createContext(null);

export const AdminReportsProvider = ({ children }) => {
    const [reports, setReports] = useState([]);
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        search: "",
        status: "",
        category: "",
        sortOrder: "desc",
    });
    const [loadingReports, setLoadingReports] = useState(false);

    const fetchReports = useCallback(async () => {
        setLoadingReports(true);
        try {
            const response = await AdminService.getReports();
            setReports(response.data);
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            setReports([]);
        } finally {
            setLoadingReports(false);
        }
    }, []);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    // Provider
    const value = {
        reports,
        loadingReports,
        refreshReports: fetchReports,
    }

    return (
        <AdminReportsContext.Provider value={value}>
            {children}
        </AdminReportsContext.Provider>
    );
}

export const useAdminReports = () => {
    const context = useContext(AdminReportsContext);
    if (!context) {
        throw new Error("useAdminReports must be used within a AdminReportsProvider");
    }
    return context;
}
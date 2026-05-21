import { AdminService } from "@/services/AdminService";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const AdminReportsContext = createContext(null);

export const AdminReportsProvider = ({ children }) => {
    const [reports, setReports] = useState([]);
    // Pagination
    const [pagination, setPagination] = useState({
        total: 0,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
    });
    // Queries
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [filters, setFilters] = useState({
        search: "",
        status: "",
        category: "",
        sortOrder: "desc",
    });
    // Other
    const [loadingReports, setLoadingReports] = useState(false);

    const fetchReports = useCallback(async () => {
        setLoadingReports(true);
        try {
            const params = Object.fromEntries(
                Object.entries({ page, limit, ...filters }).filter(([_, v]) => v !== "") // Query kosong akan menjadi ""
            ); 
            const response = await AdminService.getReports(params);
            setReports(response.data);
            setPagination(response.pagination);
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            setReports([]);
            setPagination({ total: 0, totalPages: 1, hasNext: false, hasPrev: false });
        } finally {
            setLoadingReports(false);
        }
    }, [page, limit, filters]);

    // Fetching
    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    // Filters changed
    useEffect(() => {
        setPage(1);
    }, [filters]);

    // Helpers
    const updateFilters = useCallback((newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters({ search: "", status: "", category: "", sortOrder: "desc" });
    }, []);

    // Provider
    const value = {
        // Data
        reports,
        loadingReports,
        pagination,
        // Queries
        page,
        limit,
        setPage,
        setLimit,
        filters,
        updateFilters,
        resetFilters,
        // Manual refresh
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
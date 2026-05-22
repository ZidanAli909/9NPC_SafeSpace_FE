import { ReportService } from "@/services/ReportService";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const ReportsContext = createContext(null);

export const ReportsProvider = ({ children }) => {
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
            category: "",
        });
        // Other
        const [loadingReports, setLoadingReports] = useState(false);

    const fetchReports = useCallback(async () => {
        setLoadingReports(true);
        try {
            const params = Object.fromEntries(
                Object.entries({ page, limit, ...filters }).filter(([_, v]) => v !== "") // Query kosong akan menjadi ""
            ); 
            const response = await ReportService.readAllUserReports(params);
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
        setFilters({ search: "", category: "" });
    }, []);

    // Provider
    const value = {
        // Data
        reports,
        loadingReports,
        pagination,
        refreshReports: fetchReports,
        // Queries
        page,
        setPage,
        limit,
        setLimit,
        filters,
        updateFilters,
        resetFilters
    }
    return (
        <ReportsContext.Provider value={value}>
            {children}
        </ReportsContext.Provider>
    );
};

export const useReports = () => {
    const context = useContext(ReportsContext);
    if (!context) {
        throw new Error("useReport must be used within a ReportProvider");
    }
    return context;
};
import { AdminService } from "@/services/AdminService";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

// NOTE: Admin is a mix of AuthContext and ProfileContext!
const AdminReportContext = createContext(null);

export const AdminReportProvider = ({ children }) => {
    const [report, setReport] = useState(null);
    const [loadingReport, setLoadingReport] = useState(false);

    const fetchReportById = useCallback(async (id) => {
        setLoadingReport(true);
        try {
            const response = await AdminService.getReport(id);
            setReport(response.data);
            return response.data; // Immediate retrieval
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            setReport(null);
        } finally {
            setLoadingReport(false);
        }
    }, []);

    // Provider
    const value = {
        report,
        loadingReport,
        refreshReport: fetchReportById,
    }

    return (
        <AdminReportContext.Provider value={value}>
            {children}
        </AdminReportContext.Provider>
    );
}

export const useAdminReport = () => {
    const context = useContext(AdminReportContext);
    if (!context) {
        throw new Error("useAdminReport must be used within a AdminReportProvider");
    }
    return context;
}
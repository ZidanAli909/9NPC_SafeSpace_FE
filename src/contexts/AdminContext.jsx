import { AdminService } from "@/services/AdminService";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

// NOTE: Admin is a mix of AuthContext and ProfileContext!
const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
    // For getReports
    const [reports, setReports] = useState([]);
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

    // For getReport
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
        reports,
        loadingReports,
        refreshReports: fetchReports,
        report,
        loadingReport,
        fetchReportById,
    }

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
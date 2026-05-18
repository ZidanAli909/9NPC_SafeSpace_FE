import { ReportService } from "@/services/ReportService";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const ReportContext = createContext(null);

export const ReportProvider = ({ children }) => {
    // For readAllUserReports
    const [reports, setReports] = useState([]);
    const [loadingReports, setLoadingReports] = useState(false);

    const fetchReports = useCallback(async () => {
        setLoadingReports(true);
        try {
            const response = await ReportService.readAllUserReports();
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

    // For readUserReport
    const [report, setReport] = useState(null);
    const [loadingReport, setLoadingReport] = useState(false);

    const fetchReportById = useCallback(async (id) => {
        setLoadingReport(true);
        try {
            const response = await ReportService.readUserReport(id);
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
        <ReportContext.Provider value={value}>
            {children}
        </ReportContext.Provider>
    );
};

export const useReport = () => {
    const context = useContext(ReportContext);
    if (!context) {
        throw new Error("useReport must be used within a ReportProvider");
    }
    return context;
};
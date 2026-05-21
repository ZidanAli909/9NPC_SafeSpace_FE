import { ReportService } from "@/services/ReportService";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const ReportContext = createContext(null);

export const ReportProvider = ({ children }) => {
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
        report,
        loadingReport,
        refreshReport: fetchReportById,
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
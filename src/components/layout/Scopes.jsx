import { Outlet } from 'react-router-dom';
import { ReportProvider } from '@/contexts/ReportContext';
import { AdminProvider } from '@/contexts/AdminContext';
import { AdminDashboardProvider } from '@/contexts/AdminDashboardContext';
import { AdminReportsProvider } from '@/contexts/AdminReportsContext';
import { AdminReportProvider } from '@/contexts/AdminReportContext';

export const ReportScopeLayout = () => {
  return (
    <ReportProvider>
      <Outlet /> 
    </ReportProvider>
  );
};

export const AdminScopeLayout = () => {
  return (
    <AdminProvider>
      <Outlet /> 
    </AdminProvider>
  );
};

export const AdminDashboardProviderLayout = () => {
  return (
    <AdminDashboardProvider>
      <Outlet /> 
    </AdminDashboardProvider>
  );
};

export const AdminReportsProviderLayout = () => {
  return (
    <AdminReportsProvider>
      <Outlet /> 
    </AdminReportsProvider>
  );
};

export const AdminReportProviderLayout = () => {
  return (
    <AdminReportProvider>
      <Outlet /> 
    </AdminReportProvider>
  );
};
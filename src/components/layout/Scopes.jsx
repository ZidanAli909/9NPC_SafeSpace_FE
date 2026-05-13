import { Outlet } from 'react-router-dom';
import { ReportProvider } from '@/contexts/ReportContext';
import { AdminProvider } from '@/contexts/AdminContext';

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
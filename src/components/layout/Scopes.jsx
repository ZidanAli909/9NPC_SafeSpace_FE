import { Outlet } from 'react-router-dom';
import { ReportProvider } from '@/contexts/ReportContext';

export const ReportScopeLayout = () => {
  return (
    <ReportProvider>
      <Outlet /> 
    </ReportProvider>
  );
};
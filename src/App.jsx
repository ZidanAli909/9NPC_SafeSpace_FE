import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/public/LandingPage'
import { PublicLayout } from './components/layout/Public'
import { AdminLayout } from './components/layout/Admin'
import { DashboardPage } from './pages/admin/DashboardPage'
import { ReportPage } from './pages/admin/ReportPage'
import { FAQPage } from './pages/public/faq/FAQPage'
import { PrivacyPage } from './pages/public/faq/PrivacyPage'
import { ProfileDetailsPage } from './pages/public/profile/ProfileDetailsPage'
import { ReportHistoryPage } from './pages/public/profile/ReportHistoryPage'
import { ReportHistoryDetailsPage } from './pages/public/profile/ReportHistoryDetailsPage'
import { SettingsPage } from './pages/public/profile/SettingsPage'
import { ReportGuidePage } from './pages/public/faq/GuidePage'
import { LoginPage } from './pages/auth/LoginPage'
import { AuthProvider } from './contexts/AuthContext'

// Router Handler

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/faq">
            <Route index element={<FAQPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="guide" element={<ReportGuidePage />} />
          </Route>
          <Route path="profile">
            <Route index element={<ProfileDetailsPage />} />
            <Route path="history" element={<ReportHistoryPage />} />
            <Route path="history/:id" element={<ReportHistoryDetailsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="report" element={<ReportPage />} />
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

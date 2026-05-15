import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/public/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import SignUpPage from './pages/auth/SignUpPage'
import ReportFormPage from './pages/public/ReportFormPage'
import SubmittedPage from "./pages/public/SubmittedPage"
import ArtikelDukunganPage from "./pages/public/ArtikelDukunganPage";
import ReadArticlePage from "./pages/public/ReadArticlePage";
import InfoBantuanHukumPage from "./pages/public/InfoBantuanHukumPage";
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
import { AuthProvider } from './contexts/AuthContext'
import { ProfileProvider } from './contexts/ProfileContext'
import { AdminScopeLayout, ReportScopeLayout } from './components/layout/Scopes'
import { AdminRoute } from './components/routes/AdminRoute'
import { RegisteredRoute } from './components/routes/RegisteredRoute'
import { AdminProvider } from './contexts/AdminContext'
import { ReportDetailsPage } from './pages/admin/ReportDetailsPage'
import { AdminProfileDetailsPage } from './pages/admin/AdminProfilePage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProfileProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="report" element={<ReportFormPage />} />
              <Route path="submitted" element={<SubmittedPage />} />
              <Route path="artikel">
                <Route index element={<ArtikelDukunganPage />} />
                <Route path=":slug" element={<ReadArticlePage />} />
              </Route>
              <Route path="hukum" element={<InfoBantuanHukumPage />} />
              <Route path="faq">
                <Route index element={<FAQPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
                <Route path="guide" element={<ReportGuidePage />} />
              </Route>
              {/* Registered-only Routes */}
              <Route element={<RegisteredRoute />}>
                <Route path="profile">
                  <Route index element={<ProfileDetailsPage />} />
                  <Route path="history" element={<ReportScopeLayout />}>
                    <Route index element={<ReportHistoryPage />} />
                    <Route path=":id" element={<ReportHistoryDetailsPage />} />
                  </Route>
                  <Route path="settings" element={<SettingsPage />} />
                </Route>
              </Route>
            </Route>
            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route element={<AdminScopeLayout />}>
                  <Route index element={<DashboardPage />} />
                  <Route path="report">
                    <Route index element={<ReportPage />} />
                    <Route path=":id" element={<ReportDetailsPage />} />
                  </Route>
                  <Route path="profile" element={<AdminProfileDetailsPage />}/>
                </Route>
              </Route>
            </Route>
          </Routes>
        </ProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
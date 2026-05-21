import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/public/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import SignUpPage from './pages/auth/SignUpPage'
import ReportFormPage from './pages/public/report/ReportFormPage'
import SubmittedPage from "./pages/public/report/ReportSubmittedPage"
import { PublicLayout } from './components/layout/Public'
import { AdminLayout } from './components/layout/Admin'
import { DashboardPage } from './pages/admin/DashboardPage'
import { ReportPage } from './pages/admin/ReportPage'
import { FAQPage } from './pages/public/faq/FAQTechnicalPage'
import { PrivacyPage } from './pages/public/faq/FAQPrivacyPage'
import { ProfileDetailsPage } from './pages/public/profile/ProfileDetailsPage'
import { ReportHistoryPage } from './pages/public/profile/ReportHistoryPage'
import { ReportHistoryDetailsPage } from './pages/public/profile/ReportHistoryDetailsPage'
import { SettingsPage } from './pages/public/profile/SettingsPage'
import { ReportGuidePage } from './pages/public/faq/FAQGuidePage'
import { AuthProvider } from './contexts/AuthContext'
import { ProfileProvider } from './contexts/ProfileContext'
import { AdminScopeLayout, ReportScopeLayout } from './components/layout/Scopes'
import { AdminRoute } from './components/routes/AdminRoute'
import { RegisteredRoute } from './components/routes/RegisteredRoute'
import { ReportDetailsPage } from './pages/admin/ReportDetailsPage'
import { AdminProfileDetailsPage } from './pages/admin/AdminProfilePage'
import { ProfileEditPage } from './pages/public/profile/ProfileEditPage'
import LegalPage from './pages/public/help/LegalPage'
import ArticleIndexPage from './pages/public/help/ArticleIndexPage'
import ArticleReadPage from './pages/public/help/ArticleReadPage'
import ReportSubmittedPage from './pages/public/report/ReportSubmittedPage'
import { FirstTimeSetupPage } from './pages/public/SetupAccountPage'

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
              {/* <Route path="forget-password" element={<SubmittedPage />} /> */}
              {/* <Route path="reset-password" element={<SubmittedPage />} /> */}
              <Route path="setup" element={<FirstTimeSetupPage />} />
              <Route path="report">
                <Route index element={<ReportFormPage />} />
                <Route path="submitted" element={<ReportSubmittedPage />} />
              </Route>
              <Route path="help">
                <Route path="article">
                  <Route index element={<ArticleIndexPage />} />
                  <Route path=":slug" element={<ArticleReadPage />} />
                </Route>
                <Route path="legal" element={<LegalPage />} />
              </Route>
              <Route path="faq">
                <Route index element={<FAQPage />} />
                <Route path="technical" element={<FAQPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
                <Route path="guide" element={<ReportGuidePage />} />
              </Route>
              {/* Registered-only Routes */}
              <Route element={<RegisteredRoute />}>
                <Route path="profile">
                  <Route index element={<ProfileDetailsPage />} />
                  <Route path="edit" element={<ProfileEditPage />} />
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
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

// Router Handler

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/faq">
            <Route index element={<FAQPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
          </Route>
          <Route path="profile">
            <Route index element={<ProfileDetailsPage />} />
            <Route path="history" element={<ReportHistoryPage />} />
            <Route path="history/:id" element={<ReportHistoryDetailsPage />} />
          </Route>
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="report" element={<ReportPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

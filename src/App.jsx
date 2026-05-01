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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="report" element={<ReportFormPage />} />
          <Route path="submitted" element={<SubmittedPage />} />
          <Route path="artikel" element={<ArtikelDukunganPage />} />
          <Route path="artikel/:slug" element={<ReadArticlePage />} />
          <Route path="hukum" element={<InfoBantuanHukumPage />} />
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
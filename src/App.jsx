import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/public/LandingPage'
import { PublicLayout } from './components/layout/Public'
import { AdminLayout } from './components/layout/Admin'
import { DashboardPage } from './pages/admin/DashboardPage'
import { ReportPage } from './pages/admin/ReportPage'

// Router Handler

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
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

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/public/LandingPage'
import { PublicLayout } from './components/layout/Public'

// Router Handler

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

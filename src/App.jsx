import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar/NavBar.jsx'
import { Footer } from './components/Footer/Footer.jsx'

import { LandingPage } from './pages/LandingPage/LandingPage.jsx'
import { DiscoverPage } from './pages/DiscoverPage/DiscoverPage.jsx'
import { NgoDetailPage } from './pages/NgoDetailPage/NgoDetailPage.jsx'
import { MatchingPage } from './pages/MatchingPage/MatchingPage.jsx'
import { AboutPage } from './pages/AboutPage/AboutPage.jsx'
import { DonationPage } from './pages/DonationPage/DonationPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/ngo/:id" element={<NgoDetailPage />} />
        <Route path="/donate/:ngoId" element={<DonationPage />} />
        <Route path="/matching" element={<MatchingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { NotificationProvider } from './components/NotificationSystem/NotificationSystem.jsx'
import { GamificationProvider } from './components/Gamification/GamificationContext.jsx'
import { NavBar } from './components/NavBar/NavBar.jsx'
import { Footer } from './components/Footer/Footer.jsx'

import { LandingPage } from './pages/LandingPage/LandingPage.jsx'
import { DiscoverPage } from './pages/DiscoverPage/DiscoverPage.jsx'
import { NgoDetailPage } from './pages/NgoDetailPage/NgoDetailPage.jsx'
import { MatchingPage } from './pages/MatchingPage/MatchingPage.jsx'
import { AboutPage } from './pages/AboutPage/AboutPage.jsx'
import { DonationPage } from './pages/DonationPage/DonationPage.jsx'
import { ProfilePage } from './pages/ProfilePage/ProfilePage.jsx'
import { ComparePage } from './pages/ComparePage/ComparePage.jsx'
import { VolunteerPage } from './pages/VolunteerPage/VolunteerPage.jsx'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GamificationProvider>
          <NotificationProvider>
            <BrowserRouter>
              <NavBar />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/discover" element={<DiscoverPage />} />
                <Route path="/ngo/:id" element={<NgoDetailPage />} />
                <Route path="/donate/:ngoId" element={<DonationPage />} />
                <Route path="/matching" element={<MatchingPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/volunteer" element={<VolunteerPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </NotificationProvider>
        </GamificationProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

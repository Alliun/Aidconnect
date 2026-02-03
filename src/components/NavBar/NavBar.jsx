import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext.jsx'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { AuthModal } from '../AuthModal/AuthModal.jsx'
import styles from './NavBar.module.css'

export function NavBar() {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' })

  const openAuthModal = (mode) => {
    setAuthModal({ isOpen: true, mode })
  }

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'login' })
  }

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.inner}`}>
          <NavLink to="/" className={styles.brand}>
            <span className={styles.logo}>🤝</span>
            Aidconnect
          </NavLink>

          <nav className={styles.nav}>
            <NavLink to="/discover" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
              Discover
            </NavLink>
            <NavLink to="/matching" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
              Matching
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
              About
            </NavLink>
            
            {user ? (
              <div className={styles.userMenu}>
                <span className={styles.userName}>{user.email}</span>
                <button onClick={logout} className={styles.logoutBtn}>
                  Logout
                </button>
              </div>
            ) : (
              <div className={styles.authButtons}>
                <button onClick={() => openAuthModal('login')} className={styles.loginBtn}>Login</button>
                <button onClick={() => openAuthModal('signup')} className={styles.signupBtn}>Sign Up</button>
              </div>
            )}
            
            <button 
              onClick={toggleTheme} 
              className={styles.themeToggle}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </nav>
        </div>
      </header>
      
      <AuthModal 
        isOpen={authModal.isOpen} 
        onClose={closeAuthModal} 
        mode={authModal.mode} 
      />
    </>
  )
}


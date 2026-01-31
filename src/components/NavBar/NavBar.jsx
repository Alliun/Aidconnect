import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'

export function NavBar() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.brand}>
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
        </nav>
      </div>
    </header>
  )
}


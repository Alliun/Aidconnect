import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <div className={styles.title}>Aidconnect</div>
          <div className="muted">A simple directory to find donation centers in a city.</div>
        </div>

        <div className={styles.links}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
          <Link to="/discover" className={styles.link}>
            Discover
          </Link>
          <Link to="/matching" className={styles.link}>
            Matching
          </Link>
          <Link to="/about" className={styles.link}>
            About
          </Link>
        </div>
      </div>
    </footer>
  )
}


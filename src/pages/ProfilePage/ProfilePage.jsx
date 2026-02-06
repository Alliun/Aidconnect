import { useAuth } from '../../contexts/AuthContext'
import { GamificationDashboard } from '../../components/Gamification/GamificationDashboard'
import { Navigate } from 'react-router-dom'
import styles from './ProfilePage.module.css'

export function ProfilePage() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="page">
      <div className="container">
        <div className={styles.header}>
          <div>
            <h1>My Profile</h1>
            <p className="muted">{user.email}</p>
          </div>
        </div>

        <GamificationDashboard />
      </div>
    </main>
  )
}
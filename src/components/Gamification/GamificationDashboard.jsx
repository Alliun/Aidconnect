import { useGamification } from './GamificationContext'
import styles from './GamificationDashboard.module.css'

export function GamificationDashboard() {
  const { 
    userProgress, 
    getCurrentLevel, 
    getNextLevel, 
    getProgressToNextLevel,
    ACHIEVEMENT_BADGES 
  } = useGamification()

  const currentLevel = getCurrentLevel()
  const nextLevel = getNextLevel()
  const progressPercent = getProgressToNextLevel()

  const monthlyProgressPercent = (userProgress.monthlyProgress / userProgress.monthlyGoal) * 100

  return (
    <div className={styles.dashboard}>
      {/* Impact Level Card */}
      <div className={`${styles.card} ${styles.levelCard}`}>
        <div className={styles.levelHeader}>
          <span className={styles.levelIcon} style={{ fontSize: '48px' }}>
            {currentLevel.icon}
          </span>
          <div>
            <h3 className={styles.levelName} style={{ color: currentLevel.color }}>
              {currentLevel.name}
            </h3>
            <p className={styles.points}>{userProgress.points.toLocaleString()} points</p>
          </div>
        </div>
        
        {nextLevel && (
          <div className={styles.levelProgress}>
            <div className={styles.progressInfo}>
              <span>Progress to {nextLevel.name}</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ 
                  width: `${progressPercent}%`,
                  background: `linear-gradient(90deg, ${currentLevel.color}, ${nextLevel.color})`
                }}
              />
            </div>
            <p className={styles.pointsNeeded}>
              {nextLevel.minPoints - userProgress.points} points to next level
            </p>
          </div>
        )}
      </div>

      {/* Streak Card */}
      <div className={`${styles.card} ${styles.streakCard}`}>
        <div className={styles.streakHeader}>
          <span className={styles.streakIcon}>🔥</span>
          <div>
            <h4>Donation Streak</h4>
            <p className={styles.streakDays}>{userProgress.currentStreak} days</p>
          </div>
        </div>
        <div className={styles.streakStats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Longest</span>
            <span className={styles.statValue}>{userProgress.longestStreak} days</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Total Donations</span>
            <span className={styles.statValue}>{userProgress.donationCount}</span>
          </div>
        </div>
      </div>

      {/* Monthly Challenge */}
      <div className={`${styles.card} ${styles.challengeCard}`}>
        <h4>Monthly Challenge</h4>
        <p className={styles.challengeGoal}>
          Goal: ₹{userProgress.monthlyGoal.toLocaleString()}
        </p>
        <div className={styles.progressBar}>
          <div 
            className={`${styles.progressFill} ${styles.challengeFill}`}
            style={{ width: `${Math.min(monthlyProgressPercent, 100)}%` }}
          />
        </div>
        <div className={styles.challengeInfo}>
          <span>₹{userProgress.monthlyProgress.toLocaleString()}</span>
          <span>{Math.round(monthlyProgressPercent)}%</span>
        </div>
        {monthlyProgressPercent >= 100 && (
          <div className={styles.challengeComplete}>
            🎉 Challenge Complete!
          </div>
        )}
      </div>

      {/* Badges Collection */}
      <div className={`${styles.card} ${styles.badgesCard}`}>
        <h4>Achievement Badges</h4>
        <div className={styles.badgesGrid}>
          {ACHIEVEMENT_BADGES.map(badge => {
            const earned = userProgress.badges.includes(badge.id)
            return (
              <div 
                key={badge.id}
                className={`${styles.badge} ${earned ? styles.earned : styles.locked}`}
                title={badge.description}
              >
                <span className={styles.badgeIcon}>{badge.icon}</span>
                <span className={styles.badgeName}>{badge.name}</span>
              </div>
            )
          })}
        </div>
        <p className={styles.badgeCount}>
          {userProgress.badges.length} / {ACHIEVEMENT_BADGES.length} unlocked
        </p>
      </div>

      {/* Stats Summary */}
      <div className={`${styles.card} ${styles.statsCard}`}>
        <h4>Your Impact</h4>
        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <span className={styles.statIcon}>💰</span>
            <span className={styles.statValue}>₹{userProgress.totalDonated.toLocaleString()}</span>
            <span className={styles.statLabel}>Total Donated</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statIcon}>🏢</span>
            <span className={styles.statValue}>{userProgress.supportedNGOs.length}</span>
            <span className={styles.statLabel}>NGOs Supported</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statIcon}>🍽️</span>
            <span className={styles.statValue}>{Math.floor(userProgress.totalDonated / 50)}</span>
            <span className={styles.statLabel}>Meals Provided</span>
          </div>
        </div>
      </div>
    </div>
  )
}
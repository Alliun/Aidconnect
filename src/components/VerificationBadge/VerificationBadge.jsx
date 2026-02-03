import styles from './VerificationBadge.module.css'

const BADGE_TYPES = {
  GOVERNMENT: {
    icon: '🏛️',
    label: 'Government Registered',
    color: 'blue',
    description: 'Registered with Ministry of Home Affairs'
  },
  FCRA: {
    icon: '🌍',
    label: 'FCRA Approved',
    color: 'green',
    description: 'Foreign Contribution Regulation Act approved'
  },
  TAX_EXEMPT: {
    icon: '📋',
    label: '80G Certified',
    color: 'purple',
    description: 'Tax exemption under section 80G'
  },
  AUDITED: {
    icon: '✅',
    label: 'Audited',
    color: 'orange',
    description: 'Annual financial audit completed'
  },
  TRANSPARENCY: {
    icon: '👁️',
    label: 'Transparent',
    color: 'teal',
    description: 'Publishes annual reports and financials'
  }
}

export function VerificationBadge({ type, showLabel = true, showTooltip = false }) {
  const badge = BADGE_TYPES[type]
  if (!badge) return null

  return (
    <div 
      className={`${styles.badge} ${styles[badge.color]}`}
      title={showTooltip ? badge.description : ''}
    >
      <span className={styles.icon}>{badge.icon}</span>
      {showLabel && <span className={styles.label}>{badge.label}</span>}
    </div>
  )
}

export function VerificationBadges({ verifications = [], compact = false }) {
  if (!verifications.length) return null

  return (
    <div className={styles.badges}>
      {verifications.map((type) => (
        <VerificationBadge 
          key={type} 
          type={type} 
          showLabel={!compact}
          showTooltip={compact}
        />
      ))}
    </div>
  )
}
import styles from './VerificationBadge.module.css'

const BADGE_TYPES = {
  GOVERNMENT: {
    icon: '🏛️',
    label: 'Government Registered',
    color: 'blue',
    description: 'Registered with Ministry of Home Affairs',
    animate: false
  },
  FCRA: {
    icon: '🌍',
    label: 'FCRA Approved',
    color: 'green',
    description: 'Foreign Contribution Regulation Act approved',
    animate: false
  },
  TAX_EXEMPT: {
    icon: '📋',
    label: '80G Certified',
    color: 'purple',
    description: 'Tax exemption under section 80G',
    animate: false
  },
  AUDITED: {
    icon: '✅',
    label: 'Audited',
    color: 'orange',
    description: 'Annual financial audit completed',
    animate: false
  },
  TRANSPARENCY: {
    icon: '👁️',
    label: 'Transparent',
    color: 'teal',
    description: 'Publishes annual reports and financials',
    animate: false
  },
  VERIFIED: {
    icon: '✓',
    label: 'Verified',
    color: 'blue',
    description: 'Identity and credentials verified',
    animate: true
  },
  TRUSTED: {
    icon: '⭐',
    label: 'Trusted Partner',
    color: 'gold',
    description: 'Established track record of impact',
    animate: true
  },
  ISO_CERTIFIED: {
    icon: '🎖️',
    label: 'ISO Certified',
    color: 'purple',
    description: 'ISO 9001:2015 Quality Management certified',
    animate: false
  },
  IMPACT: {
    icon: '💪',
    label: 'High Impact',
    color: 'orange',
    description: 'Proven measurable social impact',
    animate: false
  },
  SECURE: {
    icon: '🔒',
    label: 'Secure Payments',
    color: 'green',
    description: 'PCI-DSS compliant payment processing',
    animate: false
  },
  AWARD: {
    icon: '🏆',
    label: 'Award Winner',
    color: 'gold',
    description: 'Recognized for excellence in social work',
    animate: true
  },
  NITI: {
    icon: '🇮🇳',
    label: 'NITI Aayog',
    color: 'blue',
    description: 'Registered with NITI Aayog Darpan',
    animate: false
  },
  CSR: {
    icon: '🤝',
    label: 'CSR Eligible',
    color: 'teal',
    description: 'Eligible for Corporate Social Responsibility funding',
    animate: false
  }
}

export function VerificationBadge({ type, showLabel = true, showTooltip = false, size = 'md' }) {
  const badge = BADGE_TYPES[type]
  if (!badge) return null

  const badgeClasses = [
    styles.badge,
    styles[badge.color],
    styles[size],
    badge.animate && styles.animate
  ].filter(Boolean).join(' ')

  return (
    <div 
      className={badgeClasses}
      title={showTooltip ? badge.description : ''}
      role="img"
      aria-label={badge.description}
    >
      <span className={styles.icon}>{badge.icon}</span>
      {showLabel && <span className={styles.label}>{badge.label}</span>}
    </div>
  )
}

export function VerificationBadges({ verifications = [], compact = false, size = 'md' }) {
  if (!verifications.length) return null

  return (
    <div className={styles.badges}>
      {verifications.map((type) => (
        <VerificationBadge 
          key={type} 
          type={type} 
          showLabel={!compact}
          showTooltip={compact}
          size={size}
        />
      ))}
    </div>
  )
}

export { BADGE_TYPES }
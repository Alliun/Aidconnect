import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './NgoCard.module.css'
import { normalizeUrl } from '../../utils/urlHelpers.js'
import { VerificationBadges } from '../VerificationBadge/VerificationBadge.jsx'

export function NgoCard({ ngo, isActive }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const navigate = useNavigate()

  function handleCardClick() {
    setIsExpanded(!isExpanded)
  }

  function handleDonateClick(e) {
    e.stopPropagation()
    navigate(`/donate/${ngo.id}`)
  }

  function handleWebsiteClick(e) {
    e.stopPropagation()
    // Let the anchor tag handle navigation naturally
  }

  return (
    <article
      className={`${styles.card} ${isActive ? styles.active : ''} ${isExpanded ? styles.expanded : ''}`}
      onClick={handleCardClick}
    >
      <div className={styles.imageContainer}>
        <img src={ngo.image} alt={ngo.name} className={styles.image} />
        <div className={styles.imageBadges}>
          <VerificationBadges verifications={ngo.verifications} compact={true} />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.topRow}>
          <div>
            <div className={styles.name}>{ngo.name}</div>
            <div className={styles.meta}>
              <span className="chip">{ngo.category}</span>
              <span className={styles.distance}>
                {ngo.distanceText}
                {ngo.distanceSource && (
                  <span className={styles.distanceSource}>
                    {' '}(from {ngo.distanceSource === 'current' ? 'your location' : 'airport'})
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>Accepted donations</div>
          <div className={styles.chips}>
            {ngo.acceptedDonations.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </div>

        {isExpanded && (
          <div className={styles.expandedContent}>
            <div className={styles.description}>{ngo.description}</div>
            <div className={styles.details}>
              <div className={styles.detailItem}>
                <strong>Address:</strong> {ngo.address}, {ngo.city}
              </div>
              <div className={styles.detailItem}>
                <strong>Phone:</strong> {ngo.phone}
              </div>
              <div className={styles.detailItem}>
                <strong>Email:</strong> {ngo.email}
              </div>
              {ngo.currentlyAccepting && ngo.currentlyAccepting.length > 0 && (
                <div className={styles.detailItem}>
                  <strong>Currently accepting:</strong>
                  <ul className={styles.acceptingList}>
                    {ngo.currentlyAccepting.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
          <button className="btn btnPrimary" onClick={handleDonateClick}>
            Make Donation
          </button>
          <a
            href={normalizeUrl(ngo.website)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btnGhost"
            onClick={handleWebsiteClick}
          >
            Visit Website
          </a>
          <Link to={`/ngo/${ngo.id}`} className="btn btnGhost">
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}


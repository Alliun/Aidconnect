import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './MatchingPage.module.css'

import { CATEGORIES, DONATION_TYPES, NGOS } from '../../data/ngos.js'
import { normalizeUrl } from '../../utils/urlHelpers.js'

export function MatchingPage() {
  const [donationType, setDonationType] = useState('Money')
  const [category, setCategory] = useState('Children')
  const [maxDistance, setMaxDistance] = useState('5')
  const [submitted, setSubmitted] = useState(null)

  const results = useMemo(() => {
    if (!submitted) return []

    const maxKm = Number(submitted.maxDistance)

    const filtered = NGOS.filter((ngo) => {
      const matchesDonation = ngo.acceptedDonations.includes(submitted.donationType)
      const matchesCategory = ngo.category === submitted.category
      const matchesDistance = Number.isFinite(maxKm) ? ngo.distanceKm <= maxKm : true
      return matchesDonation && matchesCategory && matchesDistance
    })

    // Show 1–3 items max.
    return filtered.slice(0, 3)
  }, [submitted])

  function onSubmit(e) {
    e.preventDefault()
    setSubmitted({ donationType, category, maxDistance })
  }

  return (
    <main className="page">
      <div className="container">
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Matching</h1>
          <div className="muted">Pick a few options to narrow down the list.</div>
        </div>

        <form className={`${styles.form} card`} onSubmit={onSubmit}>
          <div className={styles.grid}>
            <label className={styles.field}>
              <div className={styles.label}>What do you want to donate?</div>
              <select className={styles.input} value={donationType} onChange={(e) => setDonationType(e.target.value)}>
                {DONATION_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <div className={styles.label}>Preferred category</div>
              <select className={styles.input} value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <div className={styles.label}>Distance willing to travel (km)</div>
              <input
                className={styles.input}
                value={maxDistance}
                onChange={(e) => setMaxDistance(e.target.value)}
                placeholder="e.g., 5"
                inputMode="numeric"
              />
            </label>
          </div>

          <div className={styles.actions}>
            <button className="btn btnPrimary" type="submit">
              Submit
            </button>
            <button
              className="btn btnGhost"
              type="button"
              onClick={() => {
                setDonationType('Money')
                setCategory('Children')
                setMaxDistance('5')
                setSubmitted(null)
              }}
            >
              Clear
            </button>
          </div>
        </form>

        <section className={styles.results}>
          {submitted ? (
            <>
              <div className={styles.resultHeader}>
                <div className={styles.resultTitle}>Based on your selection, these NGOs may be suitable</div>
                <div className="muted">
                  Donation: {submitted.donationType} • Category: {submitted.category} • Up to {submitted.maxDistance} km
                </div>
              </div>

              <div className={styles.cards}>
                {results.map((ngo) => (
                  <div key={ngo.id} className={`${styles.resultCard} card`}>
                    <div className={styles.cardTop}>
                      <div>
                        <div className={styles.cardName}>{ngo.name}</div>
                        <div className="muted">
                          {ngo.category} • {ngo.distanceText}
                        </div>
                      </div>
                      <div className={styles.badges}>
                        {ngo.acceptedDonations.slice(0, 3).map((t) => (
                          <span key={t} className="chip">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.cardActions}>
                      <Link className="btn btnGhost" to={`/ngo/${ngo.id}`}>
                        View details
                      </Link>
                      <a className="btn btnPrimary" href={normalizeUrl(ngo.website)} target="_blank" rel="noopener noreferrer">
                        Visit website
                      </a>
                    </div>
                  </div>
                ))}

                {results.length === 0 ? (
                  <div className={`${styles.empty} card`}>
                    <div className={styles.emptyTitle}>No matches</div>
                    <div className="muted">Try increasing distance or choosing a different category.</div>
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <div className={`${styles.tip} card`}>
              <div className={styles.tipTitle}>Fill the form and submit</div>
              <div className="muted">Results will show 1–3 matching NGOs from the local sample list.</div>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}


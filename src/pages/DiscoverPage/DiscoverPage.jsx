import { useMemo, useState, useEffect } from 'react'
import styles from './DiscoverPage.module.css'

import { NgoMap } from '../../components/NgoMap/NgoMap.jsx'
import { NgoCard } from '../../components/NgoCard/NgoCard.jsx'
import { CATEGORIES, DONATION_TYPES, NGOS } from '../../data/ngos.js'
import {
  getCurrentLocation,
  getAirportLocation,
  calculateDistance,
  formatDistance,
} from '../../utils/locationHelpers.js'

export function DiscoverPage() {
  const [city, setCity] = useState('Chennai')
  const [donationType, setDonationType] = useState('')
  const [category, setCategory] = useState('')
  const [selectedNgoId, setSelectedNgoId] = useState(null)
  const [useCurrentLocation, setUseCurrentLocation] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [locationError, setLocationError] = useState(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

  // Manual "search" — just filters the local data.
  const [submittedQuery, setSubmittedQuery] = useState({
    city: 'Chennai',
    donationType: '',
    category: '',
  })

  // Get current location on mount or when useCurrentLocation is enabled
  useEffect(() => {
    if (useCurrentLocation) {
      setIsLoadingLocation(true)
      setLocationError(null)
      getCurrentLocation()
        .then((location) => {
          setCurrentLocation(location)
          setIsLoadingLocation(false)
        })
        .catch((error) => {
          console.error('Error getting location:', error)
          setLocationError('Unable to get current location. Using airport location instead.')
          setUseCurrentLocation(false)
          setCurrentLocation(null)
          setIsLoadingLocation(false)
        })
    } else {
      setCurrentLocation(null)
      setLocationError(null)
    }
  }, [useCurrentLocation])

  // Get reference location (current location or airport)
  const referenceLocation = useMemo(() => {
    if (useCurrentLocation && currentLocation) {
      return { lat: currentLocation.lat, lng: currentLocation.lng, source: 'current' }
    }
    const airport = getAirportLocation(submittedQuery.city)
    if (airport) {
      return { lat: airport.lat, lng: airport.lng, source: 'airport' }
    }
    // Fallback to city center
    const cityLower = submittedQuery.city.toLowerCase()
    if (cityLower.includes('chennai')) {
      return { lat: 13.0827, lng: 80.2707, source: 'airport' }
    }
    if (cityLower.includes('bengaluru') || cityLower.includes('bangalore')) {
      return { lat: 12.9716, lng: 77.5946, source: 'airport' }
    }
    return { lat: 13.0827, lng: 80.2707, source: 'airport' }
  }, [useCurrentLocation, currentLocation, submittedQuery.city])

  // Filter and prioritize NGOs based on search criteria
  const filtered = useMemo(() => {
    let results = NGOS.filter((ngo) => {
      const queryCity = submittedQuery.city.trim().toLowerCase()
      const ngoCity = ngo.city.toLowerCase()
      // Match city exactly (both Chennai and Bangalore are stored correctly)
      const matchesCity = queryCity.length === 0 || ngoCity === queryCity

      const matchesDonation =
        !submittedQuery.donationType || ngo.acceptedDonations.includes(submittedQuery.donationType)

      const matchesCategory = !submittedQuery.category || ngo.category === submittedQuery.category

      return matchesCity && matchesDonation && matchesCategory
    })

    // Calculate distances from reference location
    results = results.map((ngo) => {
      const distanceKm = calculateDistance(
        referenceLocation.lat,
        referenceLocation.lng,
        ngo.location.lat,
        ngo.location.lng
      )
      const distanceText = formatDistance(distanceKm)
      const distanceSource = referenceLocation.source === 'current' ? 'current' : 'airport'
      return {
        ...ngo,
        distanceKm,
        distanceText,
        distanceSource,
      }
    })

    // If a donation type is selected, prioritize by donation priority
    if (submittedQuery.donationType) {
      results = results
        .map((ngo) => ({
          ...ngo,
          priority: ngo.donationPriority?.[submittedQuery.donationType] || 0,
        }))
        .sort((a, b) => {
          // Sort by priority (higher first), then by distance (closer first)
          if (b.priority !== a.priority) {
            return b.priority - a.priority
          }
          return a.distanceKm - b.distanceKm
        })
    } else {
      // If no donation type selected, just sort by distance
      results = results.sort((a, b) => a.distanceKm - b.distanceKm)
    }

    // Return top 5 results
    return results.slice(0, 5)
  }, [submittedQuery, referenceLocation])

  // Calculate map center based on filtered results or default city center
  const mapCenter = useMemo(() => {
    if (filtered.length > 0) {
      // Use the first result's location as center
      return [filtered[0].location.lat, filtered[0].location.lng]
    }
    // Default centers for known cities
    const cityLower = submittedQuery.city.toLowerCase()
    if (cityLower.includes('chennai')) {
      return [13.0827, 80.2707] // Chennai city center
    }
    if (cityLower.includes('bengaluru') || cityLower.includes('bangalore')) {
      return [12.9716, 77.5946] // Bangalore city center
    }
    // Default to Chennai
    return [13.0827, 80.2707]
  }, [filtered, submittedQuery.city])

  function onSearchSubmit(e) {
    e.preventDefault()
    setSubmittedQuery({ city, donationType, category })
    setSelectedNgoId(null)
  }

  return (
    <main className="page">
      <div className="container">
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Discover</h1>
          <div className="muted">Browse NGOs and donation centers in your city.</div>
        </div>

        <form className={`${styles.search} card`} onSubmit={onSearchSubmit}>
          <div className={styles.grid}>
            <label className={styles.field}>
              <div className={styles.label}>City</div>
              <select
                className={styles.input}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="Chennai">Chennai</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </label>

            <label className={styles.field}>
              <div className={styles.label}>What you want to donate</div>
              <select className={styles.input} value={donationType} onChange={(e) => setDonationType(e.target.value)}>
                <option value="">Any</option>
                {DONATION_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <div className={styles.label}>Category</div>
              <select className={styles.input} value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Any</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={styles.locationToggle}>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={useCurrentLocation}
                onChange={(e) => setUseCurrentLocation(e.target.checked)}
                disabled={isLoadingLocation}
                className={styles.toggleInput}
              />
              <span className={styles.toggleText}>
                {isLoadingLocation ? 'Getting location...' : 'Use current location'}
              </span>
            </label>
            {locationError && (
              <div className={styles.locationError}>{locationError}</div>
            )}
            {!useCurrentLocation && (
              <div className={styles.locationHint}>
                Distances shown from airport location
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <button className="btn btnPrimary" type="submit">
              Search
            </button>
            <button
              className="btn btnGhost"
              type="button"
              onClick={() => {
                setCity('Chennai')
                setDonationType('')
                setCategory('')
                setSubmittedQuery({ city: 'Chennai', donationType: '', category: '' })
                setSelectedNgoId(null)
                setUseCurrentLocation(false)
              }}
            >
              Reset
            </button>
          </div>
        </form>

        <section className={styles.resultsSection}>
          <div className={styles.resultsTop}>
            <div className={styles.resultsCount}>
              {filtered.length > 0 ? `Top ${filtered.length} results` : 'No results'}
            </div>
            {submittedQuery.donationType && (
              <div className="muted">
                Prioritized by {submittedQuery.donationType} donation priority
              </div>
            )}
          </div>

          <div className={styles.twoCol}>
            <div className={styles.left}>
              <div className={styles.mapPane}>
                <NgoMap
                  ngos={filtered}
                  selectedNgoId={selectedNgoId}
                  onSelectNgoId={setSelectedNgoId}
                  center={mapCenter}
                />
              </div>
              <div className={styles.mapHint}>
                <span className="muted">Tip:</span> click a marker to highlight a card below.
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.list}>
                {filtered.map((ngo) => (
                  <div
                    key={ngo.id}
                    onMouseEnter={() => setSelectedNgoId(ngo.id)}
                    onFocus={() => setSelectedNgoId(ngo.id)}
                  >
                    <NgoCard ngo={ngo} isActive={selectedNgoId === ngo.id} />
                  </div>
                ))}

                {filtered.length === 0 ? (
                  <div className={`${styles.empty} card`}>
                    <div className={styles.emptyTitle}>No matches</div>
                    <div className="muted">Try a different city, category, or donation type.</div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}


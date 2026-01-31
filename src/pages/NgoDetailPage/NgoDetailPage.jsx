import { useMemo } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

import styles from './NgoDetailPage.module.css'
import { getNgoById } from '../../data/ngos.js'
import { normalizeUrl } from '../../utils/urlHelpers.js'

export function NgoDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const ngo = useMemo(() => getNgoById(id), [id])

  if (!ngo) {
    return (
      <main className="page">
        <div className="container">
          <div className={`${styles.notFound} card`}>
            <div className={styles.notFoundTitle}>NGO not found</div>
            <div className="muted">This entry may have been removed from the local sample data.</div>
            <div className={styles.notFoundActions}>
              <Link to="/discover" className="btn btnPrimary">
                Back to Discover
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    `${ngo.location.lat},${ngo.location.lng}`
  )}`

  return (
    <main className="page">
      <div className="container">
        <div className={styles.top}>
          <div>
            <div className={styles.breadcrumbs}>
              <Link to="/discover" className={styles.back}>
                ← Back to Discover
              </Link>
            </div>
            <h1 className={styles.title}>{ngo.name}</h1>
            <div className={styles.meta}>
              <span className="chip">{ngo.category}</span>
              <span className="muted">{ngo.distanceText}</span>
            </div>
          </div>

          <div className={styles.topActions}>
            <button
              className="btn btnPrimary"
              onClick={() => navigate(`/donate/${ngo.id}`)}
            >
              Make Donation
            </button>
            <a className="btn btnGhost" href={normalizeUrl(ngo.website)} target="_blank" rel="noopener noreferrer">
              Visit official website
            </a>
            <a className="btn btnGhost" href={mapsUrl} target="_blank" rel="noreferrer">
              Open location in maps
            </a>
          </div>
        </div>

        <div className={styles.grid}>
          <section className={`${styles.details} card`}>
            <div className={styles.section}>
              <div className={styles.heading}>Description</div>
              <div className="muted">{ngo.description}</div>
            </div>

            <div className={styles.section}>
              <div className={styles.heading}>Address</div>
              <div className="muted">
                {ngo.address}, {ngo.city}
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.heading}>Contact information</div>
              <div className={styles.contactList}>
                <div>
                  <div className={styles.contactLabel}>Phone</div>
                  <div className="muted">{ngo.phone}</div>
                </div>
                <div>
                  <div className={styles.contactLabel}>Email</div>
                  <div className="muted">{ngo.email}</div>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.heading}>Currently accepting</div>
              <ul className={styles.list}>
                {ngo.currentlyAccepting.map((item) => (
                  <li key={item} className="muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className={`${styles.mapCard} card`}>
            <div className={styles.mapHeader}>
              <div className={styles.heading}>Location</div>
              <div className="muted">
                {ngo.location.lat.toFixed(4)}, {ngo.location.lng.toFixed(4)}
              </div>
            </div>

            <div className={styles.mapWrap}>
              <MapContainer 
                center={[ngo.location.lat, ngo.location.lng]} 
                zoom={14} 
                scrollWheelZoom 
                className={styles.map}
                key={`${ngo.id}-map`}
              >
                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[ngo.location.lat, ngo.location.lng]} />
              </MapContainer>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}


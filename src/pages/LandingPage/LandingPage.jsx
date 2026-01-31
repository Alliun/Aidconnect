import { Link } from 'react-router-dom'
import styles from './LandingPage.module.css'
import { getNgoById } from '../../data/ngos.js'
import { NgoCard } from '../../components/NgoCard/NgoCard.jsx'

export function LandingPage() {
  // Top 2 NGOs in desperate need - Blue Cross of India and HelpAge India
  const topNgos = [getNgoById('blue-cross-india'), getNgoById('helpage-india-chennai')].filter(Boolean)

  return (
    <main className="page">
      <div className="container">
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroMain}>
              <div className={styles.kicker}>Donation search made simple</div>
              <h1 className={styles.title}>Find trusted NGOs and donation centers near you</h1>
              <p className={styles.subtitle}>
                Aidconnect gently brings together local NGOs, shelters, and community centers in Chennai so you can decide where to
                give time, goods, or funds.
              </p>

              <div className={styles.heroActions}>
                <Link to="/discover" className="btn btnPrimary">
                  Explore NGOs
                </Link>
                <Link to="/matching" className="btn btnGhost">
                  Use matching
                </Link>
              </div>

              <div className={styles.heroMeta}>
                <span className="muted">No sign‑up required • Chennai based • Links to official NGO sites</span>
              </div>
            </div>

            <div className={styles.heroPanel}>
              <div className={styles.panelHeader}>Quick look</div>
              <div className={styles.panelBody}>
                <div className={styles.panelRow}>
                  <span className={styles.panelLabel}>City</span>
                  <span className={styles.panelValue}>Chennai</span>
                </div>
                <div className={styles.panelRow}>
                  <span className={styles.panelLabel}>Popular donation types</span>
                  <span className={styles.panelValue}>Money, Food, Volunteering</span>
                </div>
                <div className={styles.panelRow}>
                  <span className={styles.panelLabel}>Categories</span>
                  <span className={styles.panelValue}>Children • Animals • Elderly • Medical</span>
                </div>
              </div>
              <Link to="/discover" className={`${styles.panelCta} btn btnGhost`}>
                Open discovery map
              </Link>
            </div>
          </div>
        </section>

        {topNgos.length > 0 && (
          <section className={styles.topNgos}>
            <h2 className={styles.sectionTitle}>Organizations in urgent need</h2>
            <p className={styles.sectionSubtitle}>These organizations are currently in desperate need of support</p>
            <div className={styles.ngoGrid}>
              {topNgos.map((ngo) => (
                <NgoCard key={ngo.id} ngo={ngo} isActive={false} />
              ))}
            </div>
          </section>
        )}

        <section className={styles.howItWorks}>
          <h2 className={styles.sectionTitle}>A calm way to decide where to help</h2>
          <div className={styles.columns}>
            <div className={styles.columnCard}>
              <div className={styles.columnTitle}>Browse by need</div>
              <p className="muted">
                Filter by what you want to give — money, food, clothes, books, or volunteering — and see nearby options.
              </p>
            </div>
            <div className={styles.columnCard}>
              <div className={styles.columnTitle}>See clear details</div>
              <p className="muted">
                Each NGO card shows accepted donations, distance, and contact information in a simple layout.
              </p>
            </div>
            <div className={styles.columnCard}>
              <div className={styles.columnTitle}>Reach out directly</div>
              <p className="muted">
                When you are ready, visit the official website, open the map, or use the contact details to plan your visit.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}


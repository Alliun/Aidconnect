import styles from './AboutPage.module.css'

export function AboutPage() {
  return (
    <main className="page">
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>About</h1>
          <div className="muted">A simple directory-style website for finding donation centers in a city.</div>
        </div>

        <section className={`${styles.card} card`}>
          <div className={styles.section}>
            <div className={styles.heading}>Why this platform exists</div>
            <div className="muted">
              People often want to donate, but it can take time to find a nearby and relevant organization. This site brings
              basic details into one place so users can quickly visit official websites or contact centers directly.
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.heading}>The problem it helps solve</div>
            <div className="muted">
              It reduces repeated searching across multiple sources and makes it easier to compare what different centers
              accept (money, food, clothes, books, or volunteering).
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.heading}>Future improvements (optional)</div>
            <ul className={styles.list}>
              <li className="muted">More cities and more verified listings</li>
              <li className="muted">Clearer visiting hours and donation guidelines per center</li>
              <li className="muted">A simple way for organizations to request listing updates</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}


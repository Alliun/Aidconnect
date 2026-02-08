import { useState } from 'react'
import { NGOS } from '../../data/ngos'
import styles from './ComparePage.module.css'

export function ComparePage() {
  const [selectedNgos, setSelectedNgos] = useState([])

  const addNgo = (ngo) => {
    if (selectedNgos.length < 3 && !selectedNgos.find(n => n.id === ngo.id)) {
      setSelectedNgos([...selectedNgos, ngo])
    }
  }

  const removeNgo = (id) => {
    setSelectedNgos(selectedNgos.filter(n => n.id !== id))
  }

  const getMetrics = (ngo) => ({
    transparency: ngo.verifications?.includes('TRANSPARENCY') ? 95 : 75,
    efficiency: ngo.verifications?.includes('AUDITED') ? 92 : 70,
    impact: ngo.verifications?.length * 15 + 40,
    trust: ngo.verifications?.length * 20 + 20
  })

  return (
    <main className="page">
      <div className="container">
        <div className={styles.header}>
          <h1>Compare NGOs</h1>
          <p className="muted">Select up to 3 organizations to compare side-by-side</p>
        </div>

        {selectedNgos.length === 0 && (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📊</div>
            <h3>No NGOs selected</h3>
            <p className="muted">Choose organizations below to start comparing</p>
          </div>
        )}

        {selectedNgos.length > 0 && (
          <div className={styles.comparison}>
            {selectedNgos.map(ngo => {
              const metrics = getMetrics(ngo)
              return (
                <div key={ngo.id} className={styles.compareCard}>
                  <button className={styles.remove} onClick={() => removeNgo(ngo.id)}>×</button>
                  <img src={ngo.image} alt={ngo.name} className={styles.image} />
                  <h3>{ngo.name}</h3>
                  <p className={styles.category}>{ngo.category}</p>
                  
                  <div className={styles.metrics}>
                    <div className={styles.metric}>
                      <div className={styles.metricLabel}>Transparency</div>
                      <div className={styles.metricBar}>
                        <div className={styles.metricFill} style={{width: `${metrics.transparency}%`}} />
                      </div>
                      <div className={styles.metricValue}>{metrics.transparency}%</div>
                    </div>
                    <div className={styles.metric}>
                      <div className={styles.metricLabel}>Efficiency</div>
                      <div className={styles.metricBar}>
                        <div className={styles.metricFill} style={{width: `${metrics.efficiency}%`}} />
                      </div>
                      <div className={styles.metricValue}>{metrics.efficiency}%</div>
                    </div>
                    <div className={styles.metric}>
                      <div className={styles.metricLabel}>Impact Score</div>
                      <div className={styles.metricBar}>
                        <div className={styles.metricFill} style={{width: `${metrics.impact}%`}} />
                      </div>
                      <div className={styles.metricValue}>{metrics.impact}%</div>
                    </div>
                    <div className={styles.metric}>
                      <div className={styles.metricLabel}>Trust Rating</div>
                      <div className={styles.metricBar}>
                        <div className={styles.metricFill} style={{width: `${metrics.trust}%`}} />
                      </div>
                      <div className={styles.metricValue}>{metrics.trust}%</div>
                    </div>
                  </div>

                  <div className={styles.info}>
                    <div className={styles.infoRow}>
                      <span>Verifications</span>
                      <strong>{ngo.verifications?.length || 0}</strong>
                    </div>
                    <div className={styles.infoRow}>
                      <span>Donation Types</span>
                      <strong>{ngo.acceptedDonations?.length || 0}</strong>
                    </div>
                    <div className={styles.infoRow}>
                      <span>Distance</span>
                      <strong>{ngo.distanceText}</strong>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className={styles.selector}>
          <h2>Select NGOs to Compare</h2>
          <div className={styles.grid}>
            {NGOS.map(ngo => (
              <button
                key={ngo.id}
                className={`${styles.ngoItem} ${selectedNgos.find(n => n.id === ngo.id) ? styles.selected : ''}`}
                onClick={() => addNgo(ngo)}
                disabled={selectedNgos.length >= 3 && !selectedNgos.find(n => n.id === ngo.id)}
              >
                <img src={ngo.image} alt={ngo.name} />
                <div className={styles.ngoInfo}>
                  <div className={styles.ngoName}>{ngo.name}</div>
                  <div className={styles.ngoCategory}>{ngo.category}</div>
                </div>
                {selectedNgos.find(n => n.id === ngo.id) && <span className={styles.check}>✓</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

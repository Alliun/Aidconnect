import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getNgoById } from '../../data/ngos.js'
import { normalizeUrl } from '../../utils/urlHelpers.js'
import styles from './DonationPage.module.css'

export function DonationPage() {
  const { ngoId } = useParams()
  const navigate = useNavigate()
  const ngo = getNgoById(ngoId)

  const [donationAmount, setDonationAmount] = useState('')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [donationType, setDonationType] = useState('Money')

  if (!ngo) {
    return (
      <main className="page">
        <div className="container">
          <div className={styles.error}>NGO not found</div>
        </div>
      </main>
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    // In a real app, this would send data to a payment gateway
    alert(`Thank you! Your donation of ₹${donationAmount} to ${ngo.name} has been recorded.`)
    navigate(`/ngo/${ngo.id}`)
  }

  return (
    <main className="page">
      <div className="container">
        <div className={styles.header}>
          <h1>Make a Donation</h1>
          <p className="muted">Support {ngo.name}</p>
        </div>

        <div className={styles.content}>
          <div className={styles.ngoInfo}>
            <h2>{ngo.name}</h2>
            <p className="muted">{ngo.description}</p>
            <div className={styles.details}>
              <div>
                <strong>Category:</strong> {ngo.category}
              </div>
              <div>
                <strong>Location:</strong> {ngo.address}, {ngo.city}
              </div>
            </div>
          </div>

          <form className={`${styles.form} card`} onSubmit={handleSubmit}>
            <h3>Donation Details</h3>

            <label className={styles.field}>
              <div className={styles.label}>What do you want to donate?</div>
              <select
                className={styles.input}
                value={donationType}
                onChange={(e) => setDonationType(e.target.value)}
                required
              >
                {ngo.acceptedDonations.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            {donationType === 'Money' && (
              <label className={styles.field}>
                <div className={styles.label}>Amount (₹)</div>
                <input
                  type="number"
                  className={styles.input}
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="1"
                  required
                />
              </label>
            )}

            <label className={styles.field}>
              <div className={styles.label}>Your Name</div>
              <input
                type="text"
                className={styles.input}
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </label>

            <label className={styles.field}>
              <div className={styles.label}>Your Email</div>
              <input
                type="email"
                className={styles.input}
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </label>

            <div className={styles.actions}>
              <button type="submit" className="btn btnPrimary">
                Proceed to Payment
              </button>
              <button
                type="button"
                className="btn btnGhost"
                onClick={() => navigate(`/ngo/${ngo.id}`)}
              >
                Cancel
              </button>
            </div>
          </form>

          <div className={styles.alternative}>
            <p className="muted">Or donate directly through their website:</p>
            <a href={normalizeUrl(ngo.website)} target="_blank" rel="noopener noreferrer" className="btn btnPrimary">
              Visit {ngo.name} Website
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

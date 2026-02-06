import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { useNotifications } from '../../components/NotificationSystem/NotificationSystem.jsx'
import { useGamification } from '../../components/Gamification/GamificationContext.jsx'
import { getNgoById } from '../../data/ngos.js'
import { normalizeUrl } from '../../utils/urlHelpers.js'
import { DonationCertificate } from '../../components/DonationCertificate/DonationCertificate.jsx'
import styles from './DonationPage.module.css'

export function DonationPage() {
  const { ngoId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addNotification } = useNotifications()
  const { addDonation } = useGamification()
  const ngo = getNgoById(ngoId)

  const [donationAmount, setDonationAmount] = useState('')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState(user?.email || '')
  const [donationType, setDonationType] = useState('Money')
  const [showCertificate, setShowCertificate] = useState(false)
  const [completedDonation, setCompletedDonation] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

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
    setIsProcessing(true)
    
    addNotification({
      type: 'info',
      title: 'Processing Donation',
      message: 'Please wait while we process your donation...'
    })
    
    setTimeout(() => {
      const donation = {
        id: 'DON' + Date.now(),
        amount: parseInt(donationAmount),
        ngoName: ngo.name,
        ngoId: ngo.id,
        donorName,
        donorEmail,
        donationType,
        date: new Date().toISOString(),
        status: 'completed'
      }
      
      setCompletedDonation(donation)
      setIsProcessing(false)
      
      // Update gamification
      const { newBadges, levelUp } = addDonation(donation.amount, ngo.id)
      
      addNotification({
        type: 'donation',
        title: 'Donation Successful!',
        message: `Your ₹${donationAmount} donation to ${ngo.name} has been processed.`,
        duration: 8000
      })
      
      // Show level up notification
      if (levelUp) {
        setTimeout(() => {
          addNotification({
            type: 'success',
            title: '🎉 Level Up!',
            message: 'Congratulations! You\'ve reached a new donor level!',
            duration: 10000
          })
        }, 1500)
      }
      
      // Show new badges
      if (newBadges.length > 0) {
        setTimeout(() => {
          addNotification({
            type: 'success',
            title: '🏆 New Badge Unlocked!',
            message: `You earned ${newBadges.length} new badge${newBadges.length > 1 ? 's' : ''}!`,
            duration: 10000
          })
        }, 2500)
      }
      
      setTimeout(() => {
        addNotification({
          type: 'impact',
          title: 'Your Impact',
          message: `Your donation will provide ${Math.floor(donationAmount / 50)} meals to children in need!`,
          duration: 10000
        })
      }, 3500)
      
      setShowCertificate(true)
    }, 2000)
  }

  const handleDownloadCertificate = () => {
    // Certificate component now handles PDF generation internally
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
              <button 
                type="submit" 
                disabled={isProcessing}
                className={`btn btnPrimary ${isProcessing ? 'loading' : ''}`}
              >
                {isProcessing ? '💳 Processing...' : 'Proceed to Payment'}
              </button>
              <button
                type="button"
                className="btn btnGhost"
                disabled={isProcessing}
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
        
        {showCertificate && completedDonation && (
          <DonationCertificate
            donation={completedDonation}
            onClose={() => {
              setShowCertificate(false)
              navigate(`/ngo/${ngo.id}`)
            }}
          />
        )}
      </div>
    </main>
  )
}

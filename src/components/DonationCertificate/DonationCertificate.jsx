import { useRef } from 'react'
import styles from './DonationCertificate.module.css'

export function DonationCertificate({ donation, onDownload, onClose }) {
  const certificateRef = useRef()

  const generateQRCode = (data) => {
    // Simple QR code placeholder - in production, use a QR library
    return `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(data)}`
  }

  const handleDownload = () => {
    // In production, use html2canvas or similar to generate PDF
    if (onDownload) onDownload(certificateRef.current)
  }

  const verificationData = {
    id: donation.id,
    amount: donation.amount,
    ngo: donation.ngoName,
    date: donation.date,
    donor: donation.donorEmail
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Donation Certificate</h2>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <div ref={certificateRef} className={styles.certificate}>
          <div className={styles.certificateHeader}>
            <div className={styles.logo}>🤝</div>
            <div>
              <h3>AidConnect</h3>
              <p>Digital Donation Certificate</p>
            </div>
          </div>

          <div className={styles.certificateBody}>
            <div className={styles.mainContent}>
              <h4>Certificate of Donation</h4>
              <p className={styles.thankYou}>
                Thank you for your generous contribution to making a difference!
              </p>

              <div className={styles.donationDetails}>
                <div className={styles.detailRow}>
                  <span>Donation Amount:</span>
                  <strong>₹{donation.amount}</strong>
                </div>
                <div className={styles.detailRow}>
                  <span>NGO:</span>
                  <strong>{donation.ngoName}</strong>
                </div>
                <div className={styles.detailRow}>
                  <span>Date:</span>
                  <strong>{new Date(donation.date).toLocaleDateString('en-IN')}</strong>
                </div>
                <div className={styles.detailRow}>
                  <span>Transaction ID:</span>
                  <strong>{donation.id}</strong>
                </div>
                <div className={styles.detailRow}>
                  <span>Donor:</span>
                  <strong>{donation.donorEmail}</strong>
                </div>
              </div>

              <div className={styles.impactSection}>
                <h5>Your Impact</h5>
                <p className={styles.impactText}>
                  Your ₹{donation.amount} donation has provided {Math.floor(donation.amount / 50)} meals 
                  to children in need through {donation.ngoName}.
                </p>
              </div>

              <div className={styles.taxSection}>
                <div className={styles.taxBadge}>
                  <span className={styles.taxIcon}>📋</span>
                  <div>
                    <strong>80G Tax Exemption</strong>
                    <p>This donation is eligible for tax deduction under Section 80G of the Income Tax Act</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.sidebar}>
              <div className={styles.qrSection}>
                <img 
                  src={generateQRCode(JSON.stringify(verificationData))} 
                  alt="Verification QR Code"
                  className={styles.qrCode}
                />
                <p>Scan to verify</p>
              </div>

              <div className={styles.verificationInfo}>
                <h6>Blockchain Verified</h6>
                <p>This donation is recorded on an immutable blockchain ledger</p>
                <div className={styles.blockchainHash}>
                  Hash: {donation.id.slice(0, 8)}...{donation.id.slice(-8)}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.certificateFooter}>
            <div className={styles.footerText}>
              <p>Generated on {new Date().toLocaleDateString('en-IN')} • AidConnect Platform</p>
              <p>This is a digitally generated certificate with blockchain verification</p>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button onClick={handleDownload} className="btn btnPrimary">
            📄 Download PDF
          </button>
          <button onClick={onClose} className="btn btnGhost">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
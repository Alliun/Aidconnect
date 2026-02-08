import { useState } from 'react'
import styles from './VolunteerPage.module.css'

const VOLUNTEER_OPPORTUNITIES = [
  {
    id: 1,
    title: 'Teaching Assistant',
    ngo: 'Bright Future Children Foundation',
    category: 'Education',
    skills: ['Teaching', 'Communication'],
    time: 'Weekends (4-6 hours)',
    location: 'Bangalore',
    description: 'Help underprivileged children with homework and basic education',
    icon: '📚',
    urgent: false
  },
  {
    id: 2,
    title: 'Animal Care Volunteer',
    ngo: 'Blue Cross of India',
    category: 'Animal Welfare',
    skills: ['Animal Care', 'Physical Fitness'],
    time: 'Flexible (2-4 hours)',
    location: 'Chennai',
    description: 'Assist in feeding, cleaning, and caring for rescued animals',
    icon: '🐾',
    urgent: true
  },
  {
    id: 3,
    title: 'Elderly Companion',
    ngo: 'HelpAge India',
    category: 'Elderly Care',
    skills: ['Empathy', 'Communication'],
    time: 'Weekdays (2-3 hours)',
    location: 'Chennai',
    description: 'Spend quality time with elderly residents, read to them, or play games',
    icon: '👴',
    urgent: false
  },
  {
    id: 4,
    title: 'Medical Camp Assistant',
    ngo: 'SNEHA Foundation',
    category: 'Healthcare',
    skills: ['Medical Knowledge', 'Organization'],
    time: 'Monthly Events (6-8 hours)',
    location: 'Chennai',
    description: 'Support medical camps with registration, crowd management, and basic assistance',
    icon: '🏥',
    urgent: true
  },
  {
    id: 5,
    title: 'Food Distribution Volunteer',
    ngo: 'Akshaya Patra Foundation',
    category: 'Food & Nutrition',
    skills: ['Physical Fitness', 'Teamwork'],
    time: 'Daily (3-4 hours)',
    location: 'Bangalore',
    description: 'Help prepare and distribute meals to school children',
    icon: '🍲',
    urgent: false
  },
  {
    id: 6,
    title: 'Skill Training Mentor',
    ngo: 'Samarthanam Trust',
    category: 'Disability Support',
    skills: ['Teaching', 'Patience', 'Technical Skills'],
    time: 'Weekends (3-5 hours)',
    location: 'Bangalore',
    description: 'Train persons with disabilities in computer skills and vocational training',
    icon: '💻',
    urgent: false
  }
]

const SKILLS = ['Teaching', 'Communication', 'Animal Care', 'Medical Knowledge', 'Physical Fitness', 'Empathy', 'Organization', 'Teamwork', 'Technical Skills', 'Patience']
const TIME_COMMITMENTS = ['Flexible', 'Weekends', 'Weekdays', 'Daily', 'Monthly Events']

export function VolunteerPage() {
  const [selectedSkills, setSelectedSkills] = useState([])
  const [selectedTime, setSelectedTime] = useState('')
  const [showUrgent, setShowUrgent] = useState(false)

  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  const filteredOpportunities = VOLUNTEER_OPPORTUNITIES.filter(opp => {
    if (showUrgent && !opp.urgent) return false
    if (selectedSkills.length > 0 && !opp.skills.some(s => selectedSkills.includes(s))) return false
    if (selectedTime && !opp.time.includes(selectedTime)) return false
    return true
  })

  return (
    <main className="page">
      <div className="container">
        <div className={styles.header}>
          <h1>Volunteer Opportunities</h1>
          <p className="muted">Find meaningful ways to contribute your time and skills</p>
        </div>

        <div className={styles.filters}>
          <div className={styles.filterSection}>
            <h3>Skills</h3>
            <div className={styles.filterTags}>
              {SKILLS.map(skill => (
                <button
                  key={skill}
                  className={`${styles.tag} ${selectedSkills.includes(skill) ? styles.active : ''}`}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <h3>Time Commitment</h3>
            <div className={styles.filterTags}>
              {TIME_COMMITMENTS.map(time => (
                <button
                  key={time}
                  className={`${styles.tag} ${selectedTime === time ? styles.active : ''}`}
                  onClick={() => setSelectedTime(selectedTime === time ? '' : time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={showUrgent}
                onChange={(e) => setShowUrgent(e.target.checked)}
              />
              <span>Show only urgent opportunities</span>
            </label>
          </div>
        </div>

        <div className={styles.results}>
          <h2>{filteredOpportunities.length} Opportunities Found</h2>
          <div className={styles.grid}>
            {filteredOpportunities.map(opp => (
              <div key={opp.id} className={styles.card}>
                {opp.urgent && <div className={styles.urgent}>🚨 Urgent</div>}
                <div className={styles.icon}>{opp.icon}</div>
                <h3>{opp.title}</h3>
                <div className={styles.ngo}>{opp.ngo}</div>
                <p className={styles.description}>{opp.description}</p>
                
                <div className={styles.details}>
                  <div className={styles.detail}>
                    <span className={styles.label}>Category</span>
                    <span className={styles.value}>{opp.category}</span>
                  </div>
                  <div className={styles.detail}>
                    <span className={styles.label}>Time</span>
                    <span className={styles.value}>{opp.time}</span>
                  </div>
                  <div className={styles.detail}>
                    <span className={styles.label}>Location</span>
                    <span className={styles.value}>{opp.location}</span>
                  </div>
                </div>

                <div className={styles.skills}>
                  {opp.skills.map(skill => (
                    <span key={skill} className={styles.skillBadge}>{skill}</span>
                  ))}
                </div>

                <button className="btn btnPrimary" style={{width: '100%', marginTop: '16px'}}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

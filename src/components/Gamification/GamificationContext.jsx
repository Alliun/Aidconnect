import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'

const GamificationContext = createContext()

const IMPACT_LEVELS = {
  BRONZE: { name: 'Bronze Donor', minPoints: 0, color: '#cd7f32', icon: '🥉' },
  SILVER: { name: 'Silver Donor', minPoints: 1000, color: '#c0c0c0', icon: '🥈' },
  GOLD: { name: 'Gold Donor', minPoints: 5000, color: '#ffd700', icon: '🥇' },
  PLATINUM: { name: 'Platinum Donor', minPoints: 10000, color: '#e5e4e2', icon: '💎' },
  DIAMOND: { name: 'Diamond Donor', minPoints: 25000, color: '#b9f2ff', icon: '💠' }
}

const ACHIEVEMENT_BADGES = [
  { id: 'first-donation', name: 'First Step', icon: '🎯', description: 'Made your first donation' },
  { id: 'streak-7', name: 'Week Warrior', icon: '🔥', description: '7-day donation streak' },
  { id: 'streak-30', name: 'Monthly Hero', icon: '⭐', description: '30-day donation streak' },
  { id: 'total-1000', name: 'Generous Heart', icon: '💝', description: 'Donated ₹1,000 total' },
  { id: 'total-10000', name: 'Super Supporter', icon: '🌟', description: 'Donated ₹10,000 total' },
  { id: 'ngo-5', name: 'Diverse Giver', icon: '🎨', description: 'Supported 5 different NGOs' },
  { id: 'monthly-goal', name: 'Goal Crusher', icon: '🎖️', description: 'Completed monthly challenge' },
  { id: 'referral-3', name: 'Community Builder', icon: '🤝', description: 'Referred 3 friends' }
]

export function GamificationProvider({ children }) {
  const { user } = useAuth()
  const [userProgress, setUserProgress] = useState({
    points: 0,
    totalDonated: 0,
    donationCount: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastDonationDate: null,
    badges: [],
    level: 'BRONZE',
    monthlyGoal: 1000,
    monthlyProgress: 0,
    supportedNGOs: []
  })

  useEffect(() => {
    if (user) {
      loadUserProgress()
    }
  }, [user])

  const loadUserProgress = () => {
    const saved = localStorage.getItem(`gamification_${user?.email}`)
    if (saved) {
      setUserProgress(JSON.parse(saved))
    }
  }

  const saveProgress = (progress) => {
    if (user) {
      localStorage.setItem(`gamification_${user.email}`, JSON.stringify(progress))
      setUserProgress(progress)
    }
  }

  const addDonation = (amount, ngoId) => {
    const newProgress = { ...userProgress }
    
    // Update points (1 point per rupee)
    newProgress.points += amount
    newProgress.totalDonated += amount
    newProgress.donationCount += 1
    newProgress.monthlyProgress += amount
    
    // Update streak
    const today = new Date().toDateString()
    const lastDate = newProgress.lastDonationDate
    
    if (lastDate) {
      const daysDiff = Math.floor((new Date(today) - new Date(lastDate)) / (1000 * 60 * 60 * 24))
      if (daysDiff === 1) {
        newProgress.currentStreak += 1
      } else if (daysDiff > 1) {
        newProgress.currentStreak = 1
      }
    } else {
      newProgress.currentStreak = 1
    }
    
    newProgress.longestStreak = Math.max(newProgress.longestStreak, newProgress.currentStreak)
    newProgress.lastDonationDate = today
    
    // Track NGOs
    if (!newProgress.supportedNGOs.includes(ngoId)) {
      newProgress.supportedNGOs.push(ngoId)
    }
    
    // Update level
    newProgress.level = calculateLevel(newProgress.points)
    
    // Check for new badges
    const newBadges = checkBadges(newProgress)
    newProgress.badges = [...new Set([...newProgress.badges, ...newBadges])]
    
    saveProgress(newProgress)
    return { newBadges, levelUp: newProgress.level !== userProgress.level }
  }

  const calculateLevel = (points) => {
    if (points >= IMPACT_LEVELS.DIAMOND.minPoints) return 'DIAMOND'
    if (points >= IMPACT_LEVELS.PLATINUM.minPoints) return 'PLATINUM'
    if (points >= IMPACT_LEVELS.GOLD.minPoints) return 'GOLD'
    if (points >= IMPACT_LEVELS.SILVER.minPoints) return 'SILVER'
    return 'BRONZE'
  }

  const checkBadges = (progress) => {
    const earned = []
    
    if (progress.donationCount === 1) earned.push('first-donation')
    if (progress.currentStreak >= 7) earned.push('streak-7')
    if (progress.currentStreak >= 30) earned.push('streak-30')
    if (progress.totalDonated >= 1000) earned.push('total-1000')
    if (progress.totalDonated >= 10000) earned.push('total-10000')
    if (progress.supportedNGOs.length >= 5) earned.push('ngo-5')
    if (progress.monthlyProgress >= progress.monthlyGoal) earned.push('monthly-goal')
    
    return earned.filter(badge => !progress.badges.includes(badge))
  }

  const getCurrentLevel = () => IMPACT_LEVELS[userProgress.level]
  
  const getNextLevel = () => {
    const levels = Object.keys(IMPACT_LEVELS)
    const currentIndex = levels.indexOf(userProgress.level)
    return currentIndex < levels.length - 1 ? IMPACT_LEVELS[levels[currentIndex + 1]] : null
  }

  const getProgressToNextLevel = () => {
    const nextLevel = getNextLevel()
    if (!nextLevel) return 100
    const current = userProgress.points
    const currentLevelMin = getCurrentLevel().minPoints
    const nextLevelMin = nextLevel.minPoints
    return ((current - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100
  }

  return (
    <GamificationContext.Provider value={{
      userProgress,
      addDonation,
      getCurrentLevel,
      getNextLevel,
      getProgressToNextLevel,
      IMPACT_LEVELS,
      ACHIEVEMENT_BADGES
    }}>
      {children}
    </GamificationContext.Provider>
  )
}

export const useGamification = () => {
  const context = useContext(GamificationContext)
  if (!context) {
    throw new Error('useGamification must be used within GamificationProvider')
  }
  return context
}
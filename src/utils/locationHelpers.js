// Airport locations for major cities
export const AIRPORT_LOCATIONS = {
  Chennai: { lat: 12.9944, lng: 80.1806, name: 'Chennai International Airport' },
  Bangalore: { lat: 13.1986, lng: 77.7066, name: 'Kempegowda International Airport' },
  Bengaluru: { lat: 13.1986, lng: 77.7066, name: 'Kempegowda International Airport' },
}

// Calculate distance between two coordinates using Haversine formula
export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371 // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Format distance text
export function formatDistance(km) {
  if (km < 1) {
    return `${Math.round(km * 1000)}m away`
  }
  return `${km.toFixed(1)} km away`
}

// Get current location using geolocation API
export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          source: 'current',
        })
      },
      (error) => {
        reject(error)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  })
}

// Get airport location for a city
export function getAirportLocation(city) {
  const cityKey = city.trim()
  return (
    AIRPORT_LOCATIONS[cityKey] ||
    AIRPORT_LOCATIONS[cityKey.charAt(0).toUpperCase() + cityKey.slice(1).toLowerCase()] ||
    null
  )
}

import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { useEffect } from 'react'
import L from 'leaflet'
import styles from './NgoMap.module.css'

// Component to handle map bounds fitting
function MapBounds({ ngos }) {
  const map = useMap()

  useEffect(() => {
    if (ngos.length > 0) {
      // Create bounds to fit all markers
      const bounds = L.latLngBounds(
        ngos.map((ngo) => [ngo.location.lat, ngo.location.lng])
      )
      // Fit map to show all markers with padding
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 })
    }
  }, [ngos, map])

  return null
}

export function NgoMap({ ngos, selectedNgoId, onSelectNgoId, center }) {
  // Default center - Chennai city center
  const mapCenter = center || [13.0827, 80.2707]
  
  // Calculate optimal zoom based on number of NGOs
  const getZoom = () => {
    if (ngos.length === 0) return 12
    if (ngos.length === 1) return 14
    return 12
  }

  return (
    <div className={styles.wrap}>
      <MapContainer
        center={mapCenter}
        zoom={getZoom()}
        scrollWheelZoom
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapBounds ngos={ngos} />

        {ngos.map((ngo) => (
          <Marker
            key={ngo.id}
            position={[ngo.location.lat, ngo.location.lng]}
            eventHandlers={{
              click: () => onSelectNgoId?.(ngo.id),
            }}
          >
            <Popup>
              <div className={styles.popup}>
                <div className={styles.popupTitle}>{ngo.name}</div>
                <div className="muted">{ngo.category}</div>
                <div className="muted" style={{ fontSize: '12px', marginTop: '4px' }}>
                  {ngo.distanceText}
                </div>
                {selectedNgoId === ngo.id ? (
                  <div className={styles.popupHint}>Selected</div>
                ) : (
                  <div className={styles.popupHint}>Click to highlight</div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}


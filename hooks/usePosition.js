import { useEffect, useState } from 'react'

const defaultSettings = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0
}

export const usePosition = (watch = false, settings = defaultSettings) => {
  const [position, setPosition] = useState({})
  const [error, setError] = useState(null)

  const onChange = ({ coords, timestamp }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy,
      speed: coords.speed,
      timestamp
    })
  }

  const onError = () => {
    setError(error?.message)
  }

  useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      setError('Geolocation is not supported')
      return
    }

    const watcher = null
    if (watch) {
      // watcher = navigator.geolocation.watchPosition(
      //   onChange,
      //   onError,
      //   settings
      // )
    } else {
      // navigator.geolocation.getCurrentPosition(onChange, onError, settings)
    }

    return () => { return watcher && navigator.geolocation.clearWatch(watcher) }
  }, [
    // settings,
    // settings.enableHighAccuracy,
    // settings.timeout,
    // settings.maximumAge,
    // watch
  ])

  return { ...position, error }
}

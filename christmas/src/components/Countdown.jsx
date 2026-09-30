import { useEffect, useState } from 'react'

// Date limite réelle de commande pour une livraison avant le 24 décembre
const DEADLINE = new Date('2026-12-20T23:59:59')

const getRemaining = () => Math.max(0, DEADLINE.getTime() - Date.now())

const pad = (n) => String(n).padStart(2, '0')

export default function Countdown() {
  const [remaining, setRemaining] = useState(getRemaining)

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining()), 1000)
    return () => clearInterval(id)
  }, [])

  if (remaining === 0) return null

  const s = Math.floor(remaining / 1000)
  const units = [
    { value: Math.floor(s / 86400), label: 'Jours' },
    { value: Math.floor((s % 86400) / 3600), label: 'Heures' },
    { value: Math.floor((s % 3600) / 60), label: 'Min' },
    { value: s % 60, label: 'Sec' },
  ]

  return (
    <div className="countdown" role="timer" aria-label="Temps restant avant la dernière commande du 20 décembre">
      <span className="countdown-title">Dernières commandes dans</span>
      <div className="countdown-units">
        {units.map(u => (
          <div key={u.label} className="countdown-unit">
            <strong>{pad(u.value)}</strong>
            <span>{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

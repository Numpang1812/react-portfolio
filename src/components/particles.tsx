import { useMemo } from 'react'
import { useTheme } from '../theme'

interface ParticleStyle {
  id: number
  left: string
  delay: string
  duration: string
  size: string
  opacity: string
  bgColor?: string
}

export default function SeasonalParticles() {
  const { theme } = useTheme()

  const particles = useMemo<ParticleStyle[]>(() => {
    const isLight = theme === 'light'
    const count = isLight ? 20 : 60
    const leafColors = ['#D4573A', '#C17A2B', '#DAA520', '#B8860B', '#CD853F', '#8B4513']

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 12}s`,
      duration: `${isLight ? 8 + Math.random() * 14 : 5 + Math.random() * 10}s`,
      size: isLight
        ? `${8 + Math.random() * 16}px`
        : `${2 + Math.random() * 8}px`,
      opacity: isLight
        ? `${0.3 + Math.random() * 0.45}`
        : `${0.3 + Math.random() * 0.6}`,
      ...(isLight
        ? {
            bgColor: leafColors[Math.floor(Math.random() * leafColors.length)],
          }
        : { bgColor: undefined }),
    }))
  }, [theme])

  return (
    <div className="seasonal-particles" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
            ...(theme === 'light'
              ? { backgroundColor: p.bgColor, height: `${parseFloat(p.size) * 1.4}px` }
              : { backgroundColor: 'var(--particle-color)', '--particle-opacity': p.opacity } as React.CSSProperties),
          }}
        />
      ))}
    </div>
  )
}

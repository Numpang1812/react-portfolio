import { useMemo } from 'react'
import { useTheme } from '../useTheme'

interface ParticleStyle {
  id: number
  left: string
  delay: string
  duration: string
  size: string
  opacity: string
  bgColor?: string
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 9999 + 1) * 10000
  return x - Math.floor(x)
}

export default function SeasonalParticles() {
  const { theme } = useTheme()

  const particles = useMemo<ParticleStyle[]>(() => {
    const isLight = theme === 'light'
    const count = isLight ? 20 : 60
    const leafColors = ['#D4573A', '#C17A2B', '#DAA520', '#B8860B', '#CD853F', '#8B4513']

    return Array.from({ length: count }, (_, i) => {
      const r1 = pseudoRandom(i * 7 + 1)
      const r2 = pseudoRandom(i * 7 + 2)
      const r3 = pseudoRandom(i * 7 + 3)
      const r4 = pseudoRandom(i * 7 + 4)
      const r5 = pseudoRandom(i * 7 + 5)
      const r6 = pseudoRandom(i * 7 + 6)

      return {
        id: i,
        left: `${r1 * 100}%`,
        delay: `${r2 * 12}s`,
        duration: `${isLight ? 8 + r3 * 14 : 5 + r3 * 10}s`,
        size: isLight
          ? `${8 + r4 * 16}px`
          : `${2 + r4 * 8}px`,
        opacity: isLight
          ? `${0.3 + r5 * 0.45}`
          : `${0.3 + r5 * 0.6}`,
        ...(isLight
          ? {
              bgColor: leafColors[Math.floor(r6 * leafColors.length)],
            }
          : { bgColor: undefined }),
      }
    })
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

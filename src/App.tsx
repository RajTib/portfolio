import { useEffect, useRef, useState } from 'react'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Services from './sections/Services'
import Projects from './sections/Projects'
import IdeaVault from './sections/IdeaVault'
import Contact from './sections/Contact'
import GlowBlob from './components/GlowBlob'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'IdeaVault', href: '#ideavault' },
]

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)

  /* Scroll nav effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Custom cursor */
  useEffect(() => {
    const onMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  /* Hover detection on interactive elements */
  useEffect(() => {
    const addHover = () => setHovering(true)
    const rmHover = () => setHovering(false)
    const els = document.querySelectorAll('a, button, [data-hover]')
    els.forEach(el => { el.addEventListener('mouseenter', addHover); el.addEventListener('mouseleave', rmHover) })
    return () => els.forEach(el => { el.removeEventListener('mouseenter', addHover); el.removeEventListener('mouseleave', rmHover) })
  })

  return (
    <div className="scanlines relative min-h-screen bg-[#050608]">

      {/* Stars canvas — rendered as fixed SVG pattern */}
      <StarField />

      {/* Custom cursor */}
      <div
        className="fixed z-[999] pointer-events-none"
        style={{ left: cursorPos.x, top: cursorPos.y, transform: 'translate(-50%,-50%)' }}
      >
        <div className={`w-2.5 h-2.5 rounded-full bg-[#00ffaa] transition-transform duration-100 ${hovering ? 'scale-150' : 'scale-100'}`} />
      </div>
      <div
        className="fixed z-[998] pointer-events-none rounded-full border border-[rgba(0,255,170,0.5)] transition-all duration-200"
        style={{
          left: cursorPos.x, top: cursorPos.y,
          transform: `translate(-50%,-50%) scale(${hovering ? 1.8 : 1})`,
          width: 36, height: 36
        }}
      />

      {/* NAV */}
      <nav className={`fixed top-0 w-full z-[100] flex items-center justify-between px-16 py-5 transition-all duration-400 ${scrolled ? 'bg-[rgba(5,6,8,0.85)] backdrop-blur-xl border-b border-[rgba(0,255,170,0.08)]' : 'bg-transparent'
        }`}>
        <a href="#hero" className="font-mono-custom text-sm text-[#00ffaa] tracking-widest no-underline">
          RT<span className="text-[#6b7280]">.dev</span>
        </a>
        <ul className="flex gap-10 list-none m-0 p-0">
          {NAV_LINKS.map(l => (
            <li key={l.label}>
              <a
                href={l.href}
                className="font-mono-custom text-[0.7rem] text-[#6b7280] no-underline tracking-[0.15em] uppercase relative
                  hover:text-[#00ffaa] transition-colors duration-300
                  after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-px after:bg-[#00ffaa]
                  after:w-0 hover:after:w-full after:transition-all after:duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="font-mono-custom text-[0.7rem] text-[#00ffaa] border border-[#00ffaa] px-5 py-2
            tracking-widest uppercase hover:bg-[#00ffaa] hover:text-[#050608] transition-all duration-300"
        >
          Let's Talk
        </a>
      </nav>

      {/* Ambient glow blobs */}
      <GlowBlob className="top-[10%] right-[15%] w-96 h-96 opacity-[0.04]" color="var(--accent2)" />
      <GlowBlob className="top-[60%] left-[5%] w-72 h-72 opacity-[0.03]" color="var(--accent)" />
      <GlowBlob className="top-[80%] right-[10%] w-80 h-80 opacity-[0.03]" color="var(--accent3)" />

      {/* SECTIONS */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <IdeaVault />
        <Contact />
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 flex items-center justify-between px-16 py-6 border-t border-[rgba(0,255,170,0.08)]">
        <p className="font-mono-custom text-[0.65rem] text-[#6b7280] tracking-widest">
          © 2026 Raj Tibarewala · Built with intention
        </p>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ffaa] animate-pulse-dot" />
          <p className="font-mono-custom text-[0.65rem] text-[#6b7280] tracking-widest uppercase">
            Available for Opportunities
          </p>
        </div>
      </footer>
    </div>
  )
}

/* Animated star field using canvas */
function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let raf: number

    const stars: { x: number; y: number; r: number; o: number; speed: number; pulse: number }[] = []

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    function initStars() {
      stars.length = 0
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.2 + 0.2,
          o: Math.random() * 0.5 + 0.1,
          speed: Math.random() * 0.25 + 0.04,
          pulse: Math.random() * Math.PI * 2,
        })
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        s.pulse += 0.008
        const alpha = s.o + Math.sin(s.pulse) * 0.12
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,220,255,${alpha})`
        ctx.fill()
        s.y -= s.speed
        if (s.y < 0) { s.y = canvas.height; s.x = Math.random() * canvas.width }
      })

      // Nebula spots
      const g1 = ctx.createRadialGradient(canvas.width * 0.8, canvas.height * 0.2, 0, canvas.width * 0.8, canvas.height * 0.2, 320)
      g1.addColorStop(0, 'rgba(124,107,255,0.035)'); g1.addColorStop(1, 'transparent')
      ctx.fillStyle = g1; ctx.fillRect(0, 0, canvas.width, canvas.height)

      const g2 = ctx.createRadialGradient(canvas.width * 0.1, canvas.height * 0.65, 0, canvas.width * 0.1, canvas.height * 0.65, 260)
      g2.addColorStop(0, 'rgba(0,255,170,0.025)'); g2.addColorStop(1, 'transparent')
      ctx.fillStyle = g2; ctx.fillRect(0, 0, canvas.width, canvas.height)

      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
}

import { useEffect, useState } from 'react'
import myPic from '../assets/DSC06381.png'

const ROLES = [
  'Cybersecurity Student',
  'Systems Builder',
  'ML Researcher',
  'Ethical Hacker',
  'Open Source Dev',
]

export default function Hero() {
  const [typed, setTyped] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  /* Typing effect */
  useEffect(() => {
    const word = ROLES[roleIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting) {
      if (typed.length < word.length) {
        timeout = setTimeout(() => setTyped(word.slice(0, typed.length + 1)), 100)
      } else {
        timeout = setTimeout(() => setDeleting(true), 1800)
      }
    } else {
      if (typed.length > 0) {
        timeout = setTimeout(() => setTyped(typed.slice(0, -1)), 55)
      } else {
        setDeleting(false)
        setRoleIdx(i => (i + 1) % ROLES.length)
      }
    }
    return () => clearTimeout(timeout)
  }, [typed, deleting, roleIdx])

  return (
    <section
      id="hero"
      className="relative min-h-screen grid grid-cols-2 items-center gap-16 px-16 overflow-hidden"
    >
      {/* LEFT */}
      <div className="pt-24 z-10">

        {/* Tag */}
        <div className="section-tag mb-6 animate-fade-up">
          B.Tech CSE — Cyber Security · VIT Vellore
        </div>

        {/* Name */}
        <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-extrabold leading-none tracking-tight mb-4 animate-fade-up">
          Raj<br />
          <span className="text-gradient">Tibarewala</span>
        </h1>

        {/* Typing role */}
        <p className="font-mono-custom text-sm text-[#6b7280] tracking-wide mb-6 h-6 animate-fade-up">
          <span className="text-[#00ffaa]">{typed}</span>
          <span className="animate-blink text-[#00ffaa]">|</span>
        </p>

        {/* Description */}
        <p className="text-[#9ca3af] text-base leading-relaxed max-w-md mb-8 animate-fade-up">
          Cybersecurity researcher & systems builder at VIT Vellore. I break
          systems to understand them — then build better ones, from SIEM
          pipelines to satellite ML models.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 flex-wrap animate-fade-up">
          <a
            href="#projects"
            className="btn-chamfer font-mono-custom text-[0.72rem] bg-[#00ffaa] text-[#050608]
              px-7 py-3.5 tracking-widest uppercase font-bold no-underline
              hover:bg-[#00b4ff] hover:shadow-[0_0_30px_rgba(0,180,255,0.4)] transition-all duration-300"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="font-mono-custom text-[0.72rem] border border-[rgba(255,255,255,0.15)] text-[#e8eaf0]
              px-7 py-3.5 tracking-widest uppercase no-underline
              hover:border-[#7c6bff] hover:text-[#7c6bff] transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>

        {/* Socials */}
        <div className="flex gap-6 mt-8 animate-fade-up">
          <a href="https://github.com/RajTib" target="_blank" rel="noreferrer"
            className="font-mono-custom text-[0.68rem] text-[#6b7280] no-underline uppercase tracking-widest
              flex items-center gap-2 hover:text-[#00ffaa] transition-colors duration-300">
            <GithubIcon /> GitHub
          </a>
          <a href="YOUR_LINKEDIN_URL" target="_blank" rel="noreferrer"
            className="font-mono-custom text-[0.68rem] text-[#6b7280] no-underline uppercase tracking-widest
              flex items-center gap-2 hover:text-[#00ffaa] transition-colors duration-300">
            <LinkedinIcon /> LinkedIn
          </a>
        </div>

        {/* Stats */}
        <div className="flex gap-10 mt-10 animate-fade-up">
          {[
            { num: '8', suffix: '.70', label: 'CGPA' },
            { num: '10', suffix: '+', label: 'Projects' },
            { num: '3', suffix: '+', label: 'Certifications' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold leading-none">
                {s.num}<span className="text-[#00ffaa]">{s.suffix}</span>
              </div>
              <div className="font-mono-custom text-[0.62rem] text-[#6b7280] tracking-[0.15em] uppercase mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — photo */}
      <div className="flex justify-center items-center pt-24 z-10">
        <div className="relative w-[400px] h-[540px] animate-float">

          {/* Gradient border */}
          <div className="absolute inset-0 img-frame p-[2px]"
            style={{ background: 'linear-gradient(135deg, #00ffaa, #00b4ff, #7c6bff, transparent)' }}>
            <div className="img-frame w-full h-full bg-[#050608] overflow-hidden">
              <img
                src={myPic}
                alt="Raj Tibarewala"
                className="w-full h-full object-cover object-top grayscale-[0.15] contrast-105"
              />
            </div>
          </div>

          {/* Side accent line */}
          <div className="absolute top-8 -right-8 w-px h-4/5"
            style={{ background: 'linear-gradient(to bottom, #7c6bff, transparent)' }} />

          {/* Coordinates badge */}
          <div className="absolute -bottom-8 left-0 font-mono-custom text-[0.58rem] text-[#6b7280] tracking-[0.2em]">
            12.9716° N · 79.1588° E · VIT VELLORE
          </div>

          {/* Spinning ring */}
          <div className="absolute -inset-4 rounded-full border border-dashed border-[rgba(0,255,170,0.08)] animate-spin-slow" />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="font-mono-custom text-[0.58rem] text-[#6b7280] tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#00ffaa] to-transparent" />
      </div>
    </section>
  )
}

function GithubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

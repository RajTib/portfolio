import { useEffect, useRef } from 'react'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('opacity-100', 'translate-y-0')
      }),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 px-16 py-32 border-t border-[rgba(0,255,170,0.06)] text-center"
    >
      <div className="max-w-2xl mx-auto">
        <div className="section-tag mb-4 justify-center reveal opacity-0 translate-y-8 transition-all duration-700">
          Contact
        </div>

        <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tight leading-tight mb-6 reveal opacity-0 translate-y-8 transition-all duration-700 delay-100">
          Let's Build<br /><span className="text-gradient">Something Real</span>
        </h2>

        <p className="font-mono-custom text-[0.8rem] text-[#6b7280] leading-relaxed mb-8 reveal opacity-0 translate-y-8 transition-all duration-700 delay-150">
          Open to internships, research collaborations, and interesting problems in
          cybersecurity and systems. Based at VIT Vellore — working remotely too.
        </p>

        {/* Email */}
        <a
          href="mailto:raj.tibarewala@gmail.com"
          className="inline-block font-mono-custom text-lg text-[#00ffaa] no-underline
            border-b border-[rgba(0,255,170,0.3)] pb-1 mb-10 tracking-wide
            hover:border-[#00ffaa] transition-colors duration-300
            reveal opacity-0 translate-y-8"
          style={{ transitionDuration: '700ms', transitionDelay: '200ms' }}
        >
          raj.tibarewala@gmail.com
        </a>

        {/* Social links */}
        <div className="flex justify-center gap-8 reveal opacity-0 translate-y-8 transition-all duration-700 delay-300">
          {[
            { label: 'GitHub', href: 'https://github.com/RajTib', icon: <GithubIcon /> },
            { label: 'LinkedIn', href: 'YOUR_LINKEDIN_URL', icon: <LinkedinIcon /> },
            { label: 'Phone', href: 'tel:+919129837866', icon: <PhoneIcon /> },
          ].map(s => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="font-mono-custom text-[0.68rem] text-[#6b7280] no-underline uppercase tracking-widest
                flex items-center gap-2 hover:text-[#00ffaa] transition-colors duration-300"
            >
              {s.icon} {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.03 2.82 2 2 0 012 .67h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}

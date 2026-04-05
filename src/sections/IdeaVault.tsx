import { useEffect, useRef, useState } from 'react'
import { IDEAS, type Idea, type IdeaStatus } from '../data/ideas'

const STATUS_STYLES: Record<IdeaStatus, { label: string; dot: string; text: string; border: string }> = {
  building: { label: 'Building', dot: '#00ffaa', text: '#00ffaa', border: 'rgba(0,255,170,0.3)' },
  parked: { label: 'Parked', dot: '#f59e0b', text: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
  done: { label: 'Done', dot: '#6b7280', text: '#6b7280', border: 'rgba(107,114,128,0.2)' },
}

const FILTERS: { label: string; value: IdeaStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Building', value: 'building' },
  { label: 'Parked', value: 'parked' },
  { label: 'Done', value: 'done' },
]

export default function IdeaVault() {
  const sectionRef = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState<IdeaStatus | 'all'>('all')

  const filtered = filter === 'all' ? IDEAS : IDEAS.filter(i => i.status === filter)

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
      id="ideavault"
      ref={sectionRef}
      className="relative z-10 px-16 py-28 border-t border-[rgba(0,255,170,0.06)]"
    >
      <div className="section-tag mb-3 reveal opacity-0 translate-y-8 transition-all duration-700">
        IdeaVault
      </div>
      <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight leading-tight mb-4 reveal opacity-0 translate-y-8 transition-all duration-700 delay-100">
        Things I'm<br /><span className="text-gradient-2">Thinking About</span>
      </h2>
      <p className="font-mono-custom text-[0.8rem] text-[#6b7280] leading-relaxed max-w-lg mb-8 reveal opacity-0 translate-y-8 transition-all duration-700 delay-150">
        Not everything I work on makes it to the projects page. Here's what's in the pipeline.
      </p>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-10 reveal opacity-0 translate-y-8 transition-all duration-700 delay-200">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`font-mono-custom text-[0.65rem] px-4 py-1.5 uppercase tracking-widest border transition-all duration-200
              ${filter === f.value
                ? 'border-[#00ffaa] text-[#00ffaa] bg-[rgba(0,255,170,0.08)]'
                : 'border-[rgba(255,255,255,0.08)] text-[#6b7280] hover:border-[rgba(255,255,255,0.2)] hover:text-[#e8eaf0]'
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-5">
        {filtered.map((idea, i) => (
          <IdeaCard key={idea.id} idea={idea} delay={i * 60} />
        ))}
      </div>
    </section>
  )
}

function IdeaCard({ idea, delay }: { idea: Idea; delay: number }) {
  const s = STATUS_STYLES[idea.status]

  return (
    <div
      className="p-5 border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)]
        group hover:border-[rgba(124,107,255,0.3)] hover:bg-[rgba(124,107,255,0.02)]
        transition-all duration-300 reveal opacity-0 translate-y-8"
      style={{ transitionDuration: '600ms', transitionDelay: `${delay}ms` }}
    >
      {/* Status */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: s.dot, boxShadow: `0 0 6px ${s.dot}` }}
        />
        <span
          className="font-mono-custom text-[0.6rem] uppercase tracking-widest border px-2 py-0.5"
          style={{ color: s.text, borderColor: s.border }}
        >
          {s.label}
        </span>
      </div>

      <h3 className="font-bold text-[0.9rem] mb-2">{idea.title}</h3>
      <p className="font-mono-custom text-[0.68rem] text-[#6b7280] leading-relaxed mb-3">{idea.desc}</p>

      <div className="flex flex-wrap gap-1.5">
        {idea.tags.map(tag => (
          <span
            key={tag}
            className="font-mono-custom text-[0.57rem] text-[#7c6bff] border border-[rgba(124,107,255,0.25)] bg-[rgba(124,107,255,0.05)] px-2 py-0.5 tracking-wide"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

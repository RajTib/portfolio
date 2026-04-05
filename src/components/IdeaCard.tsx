// src/components/IdeaCard.tsx

// ─── TYPES ───────────────────────────────────────────────────────────────────
// IdeaStatus controls the colored dot and label on each card.
// Only 3 valid values: 'building' | 'parked' | 'done'

export type IdeaStatus = 'building' | 'parked' | 'done'

export interface Idea {
  id: string        // unique key for React (not shown)
  title: string     // idea/project name
  status: IdeaStatus // controls dot color + label
  desc: string      // what this idea is about
  tags: string[]    // purple tag pills at the bottom
}

// ─── STATUS STYLES ───────────────────────────────────────────────────────────
// Maps each status value to its visual treatment.
// dot    → the glowing circle color
// text   → text color of the status label
// border → border color of the status pill

const STATUS_STYLES: Record<IdeaStatus, { label: string; dot: string; text: string; border: string }> = {
  building: { label: 'Building', dot: '#00ffaa', text: '#00ffaa', border: 'rgba(0,255,170,0.3)' },
  parked: { label: 'Parked', dot: '#f59e0b', text: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
  done: { label: 'Done', dot: '#6b7280', text: '#6b7280', border: 'rgba(107,114,128,0.2)' },
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
// Props:
//   idea  → the full idea object (from ideas.ts)
//   delay → stagger delay for scroll-reveal animation

interface Props {
  idea: Idea
  delay: number
}

export default function IdeaCard({ idea, delay }: Props) {
  const s = STATUS_STYLES[idea.status]

  return (
    <div
      className="p-5 border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.01)]
        group hover:border-[rgba(124,107,255,0.3)] hover:bg-[rgba(124,107,255,0.02)]
        transition-all duration-300 reveal opacity-0 translate-y-8"
      style={{ transitionDuration: '600ms', transitionDelay: `${delay}ms` }}
    >
      {/* Status row — glowing dot + pill label */}
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

      {/* Title */}
      <h3 className="font-bold text-[0.9rem] mb-2">{idea.title}</h3>

      {/* Description */}
      <p className="font-mono-custom text-[0.68rem] text-[#6b7280] leading-relaxed mb-3">{idea.desc}</p>

      {/* Tag pills */}
      <div className="flex flex-wrap gap-1.5">
        {idea.tags.map(tag => (
          <span
            key={tag}
            className="font-mono-custom text-[0.57rem] text-[#7c6bff] border border-[rgba(124,107,255,0.25)]
              bg-[rgba(124,107,255,0.05)] px-2 py-0.5 tracking-wide"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

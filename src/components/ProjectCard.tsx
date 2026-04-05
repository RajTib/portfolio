// src/components/ProjectCard.tsx

import { type BadgeType } from '../data/projects'

// ─── TYPES ───────────────────────────────────────────────────────────────────
// This is the shape of data each ProjectCard expects to receive.
// Every field in the Project interface maps to something visible on the card.

export interface Project {
  id: string        // unique key (used internally by React, not shown on screen)
  num: string       // display number like "01", "02"
  title: string     // project name shown as the card heading
  desc: string      // short description paragraph
  tech: string[]    // array of tech tags shown as blue pills
  badge: BadgeType  // category badge shown top-right: 'security' | 'ml' | 'tool' | 'astro'
  github: string    // full GitHub URL
  live?: string     // optional — if provided, shows a "Live" link button
}

// ─── BADGE STYLES ────────────────────────────────────────────────────────────
// Each badge type has its own color scheme.
// To add a new badge type: add it to BadgeType in projects.ts, then add its
// colors here. The label is what appears on the card.

const BADGE_STYLES: Record<BadgeType, { label: string; color: string; border: string; bg: string }> = {
  security: { label: 'Security', color: '#00ffaa', border: 'rgba(0,255,170,0.3)', bg: 'rgba(0,255,170,0.05)' },
  ml: { label: 'ML', color: '#00b4ff', border: 'rgba(0,180,255,0.3)', bg: 'rgba(0,180,255,0.05)' },
  tool: { label: 'Tool', color: '#7c6bff', border: 'rgba(124,107,255,0.3)', bg: 'rgba(124,107,255,0.05)' },
  astro: { label: 'Astrophysics', color: '#00b4ff', border: 'rgba(0,180,255,0.3)', bg: 'rgba(0,180,255,0.05)' },
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
// Props:
//   project → the full project object (from projects.ts)
//   delay   → animation delay in ms, so cards stagger as they fade in

interface Props {
  project: Project
  delay: number
}

export default function ProjectCard({ project, delay }: Props) {
  const badge = BADGE_STYLES[project.badge]

  return (
    <div
      className="relative p-6 border border-[rgba(0,255,170,0.08)] bg-[rgba(255,255,255,0.01)]
        group overflow-hidden cursor-default
        hover:border-[rgba(0,255,170,0.28)] hover:-translate-y-1
        transition-all duration-300 reveal opacity-0 translate-y-8"
      style={{ transitionDuration: '700ms', transitionDelay: `${delay}ms` }}
    >
      {/* Subtle glow overlay that appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,255,170,0.03)] to-[rgba(0,180,255,0.03)]
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Badge — top right corner */}
      <span
        className="absolute top-4 right-4 font-mono-custom text-[0.55rem] px-2 py-0.5 tracking-widest uppercase border"
        style={{ color: badge.color, borderColor: badge.border, background: badge.bg }}
      >
        {badge.label}
      </span>

      {/* Number e.g. "01" */}
      <div className="font-mono-custom text-[0.62rem] text-[#6b7280] tracking-[0.2em] mb-3">
        {project.num}
      </div>

      {/* Title */}
      <h3 className="font-bold text-[0.95rem] leading-snug mb-2 pr-16">{project.title}</h3>

      {/* Description */}
      <p className="font-mono-custom text-[0.7rem] text-[#6b7280] leading-relaxed mb-4">{project.desc}</p>

      {/* Tech stack pills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.map(t => (
          <span
            key={t}
            className="font-mono-custom text-[0.58rem] text-[#00b4ff] border border-[rgba(0,180,255,0.25)]
              bg-[rgba(0,180,255,0.05)] px-2 py-0.5 tracking-wide"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links — GitHub is always shown, Live only if project.live exists */}
      <div className="flex gap-4">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="font-mono-custom text-[0.62rem] text-[#6b7280] no-underline uppercase tracking-widest
            flex items-center gap-1.5 hover:text-[#00ffaa] transition-colors duration-300"
        >
          <GithubIcon /> GitHub
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="font-mono-custom text-[0.62rem] text-[#6b7280] no-underline uppercase tracking-widest
              flex items-center gap-1.5 hover:text-[#00ffaa] transition-colors duration-300"
          >
            <ExternalIcon /> Live
          </a>
        )}
      </div>
    </div>
  )
}

// ─── ICONS ───────────────────────────────────────────────────────────────────
function GithubIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  )
}

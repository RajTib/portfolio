// src/components/SocialLink.tsx
import { type ReactNode } from 'react'

// ─── TYPES ───────────────────────────────────────────────────────────────────
// SocialLink is a generic reusable anchor tag styled for the portfolio.
// It handles both external links (GitHub, LinkedIn) and tel: / mailto: links.

interface Props {
  href: string         // the URL — can be https://, mailto:, or tel:
  label: string        // text displayed next to the icon e.g. "GitHub"
  icon: ReactNode      // pass any SVG or element as the icon
  external?: boolean   // if true, opens in a new tab (default: true for http links)
  className?: string   // optional extra Tailwind classes if you want to override style
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
// Usage example:
//   <SocialLink href="https://github.com/RajTib" label="GitHub" icon={<GithubIcon />} />
//   <SocialLink href="mailto:raj.tibarewala@gmail.com" label="Email" icon={<MailIcon />} external={false} />

export default function SocialLink({ href, label, icon, external = true, className = '' }: Props) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={`font-mono-custom text-[0.68rem] text-[#6b7280] no-underline uppercase tracking-widest
        flex items-center gap-2 hover:text-[#00ffaa] transition-colors duration-300 ${className}`}
    >
      {icon}
      {label}
    </a>
  )
}

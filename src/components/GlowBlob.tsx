interface GlowBlobProps {
  className?: string
  color?: string
}

export default function GlowBlob({ className = '', color = '#00ffaa' }: GlowBlobProps) {
  return (
    <div
      className={`fixed rounded-full pointer-events-none blur-[80px] ${className}`}
      style={{ background: color }}
    />
  )
}

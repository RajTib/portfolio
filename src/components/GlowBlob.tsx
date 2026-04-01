export const GlowBlob = ({ className }: { className?: string }) => (
  <div className={`absolute -z-10 blur-[120px] opacity-30 animate-pulse-slow ${className}`} />
);
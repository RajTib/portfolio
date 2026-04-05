import { useEffect, useRef } from 'react'

const SKILL_GROUPS = [
    {
        title: 'Languages',
        color: 'accent',
        tags: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'HTML/CSS'],
    },
    {
        title: 'Security',
        color: 'accent',
        tags: ['SIEM', 'Linux Security', 'Log Analysis', 'Attack Correlation', 'Cryptography', 'Kali Linux', 'TryHackMe'],
    },
    {
        title: 'ML / Data',
        color: 'accent3',
        tags: ['NumPy', 'Pandas', 'Scikit-learn', 'OpenCV', 'Matplotlib', 'YOLOv8', 'SegFormer'],
    },
    {
        title: 'Tools & Platforms',
        color: 'accent2',
        tags: ['Git', 'Docker', 'Linux', 'FastAPI', 'Streamlit', 'Jetson Orin', 'Raspberry Pi', 'VS Code'],
    },
]

const COLOR_MAP: Record<string, { tag: string; border: string; text: string }> = {
    accent: { tag: 'rgba(0,255,170,0.06)', border: 'rgba(0,255,170,0.12)', text: '#00ffaa' },
    accent2: { tag: 'rgba(124,107,255,0.06)', border: 'rgba(124,107,255,0.2)', text: '#7c6bff' },
    accent3: { tag: 'rgba(0,180,255,0.06)', border: 'rgba(0,180,255,0.2)', text: '#00b4ff' },
}

export default function Skills() {
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
            id="skills"
            ref={sectionRef}
            className="relative z-10 px-16 py-28 border-t border-[rgba(0,255,170,0.06)]"
        >
            <div className="section-tag mb-3 reveal opacity-0 translate-y-8 transition-all duration-700">
                Technical Skills
            </div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight leading-tight mb-12 reveal opacity-0 translate-y-8 transition-all duration-700 delay-100">
                Tools of<br /><span className="text-gradient">the Trade</span>
            </h2>

            <div className="grid grid-cols-4 gap-5">
                {SKILL_GROUPS.map((group, i) => {
                    const c = COLOR_MAP[group.color]
                    return (
                        <div
                            key={group.title}
                            className="p-5 border border-[rgba(0,255,170,0.08)] bg-[rgba(255,255,255,0.01)]
                relative overflow-hidden group
                hover:border-[rgba(0,255,170,0.2)] hover:bg-[rgba(0,255,170,0.02)]
                transition-all duration-300 reveal opacity-0 translate-y-8"
                            style={{ transitionDuration: '700ms', transitionDelay: `${i * 80 + 100}ms` }}
                        >
                            {/* Top accent bar */}
                            <div
                                className="absolute top-0 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                                style={{ background: `linear-gradient(90deg, ${c.text}, transparent)` }}
                            />

                            <div
                                className="font-mono-custom text-[0.68rem] tracking-[0.15em] uppercase mb-4"
                                style={{ color: c.text }}
                            >
                                {group.title}
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                                {group.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="font-mono-custom text-[0.6rem] text-[#e8eaf0] px-2.5 py-1 tracking-wide
                      border transition-all duration-200 cursor-default
                      hover:text-white"
                                        style={{ background: c.tag, borderColor: c.border }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

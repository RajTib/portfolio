import { useEffect, useRef } from 'react'

const SERVICES = [
    {
        icon: '🛡️',
        title: 'Security Auditing',
        desc: 'Log analysis, brute-force detection, threat correlation, and lightweight SIEM-style monitoring pipelines for Linux environments.',
        tags: ['SIEM', 'Log Analysis', 'Python'],
    },
    {
        icon: '🤖',
        title: 'ML Pipeline Development',
        desc: 'End-to-end machine learning pipelines — from data preprocessing to model inference. Specializing in computer vision and geospatial ML.',
        tags: ['YOLOv8', 'OpenCV', 'FastAPI'],
    },
    {
        icon: '🔐',
        title: 'Cryptography Implementation',
        desc: 'Hybrid encryption systems using AES + RSA, key management, and secure data handling patterns that mirror production security standards.',
        tags: ['AES', 'RSA', 'Python'],
    },
    {
        icon: '⚙️',
        title: 'Embedded Systems',
        desc: 'Edge computing and embedded Linux development on Jetson Orin Nano and Raspberry Pi. Optimized for latency, power, and compute constraints.',
        tags: ['Jetson', 'Linux', 'Edge ML'],
    },
    {
        icon: '🌐',
        title: 'Web Tools & Dashboards',
        desc: 'Developer tools and internal dashboards — like the VTOP GPA Calculator — built fast, open-sourced, and deployed on Vercel or Streamlit.',
        tags: ['React', 'Streamlit', 'Vercel'],
    },
    {
        icon: '📡',
        title: 'Research & Technical Writing',
        desc: 'Academic research support, data analysis write-ups, and co-authoring technical papers. Currently: rooftop detection & nuclear propulsion.',
        tags: ['Research', 'LaTeX', 'Data Analysis'],
    },
]

export default function Services() {
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
            id="services"
            ref={sectionRef}
            className="relative z-10 px-16 py-28 border-t border-[rgba(0,255,170,0.06)]"
        >
            <div className="section-tag mb-3 reveal opacity-0 translate-y-8 transition-all duration-700">
                Services
            </div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight leading-tight mb-4 reveal opacity-0 translate-y-8 transition-all duration-700 delay-100">
                What I Can<br /><span className="text-gradient">Build For You</span>
            </h2>
            <p className="font-mono-custom text-[0.8rem] text-[#6b7280] leading-relaxed max-w-lg mb-12 reveal opacity-0 translate-y-8 transition-all duration-700 delay-150">
                A 2nd-year student who ships production-grade work. Here's where I can actually add value.
            </p>

            <div className="grid grid-cols-3 gap-5">
                {SERVICES.map((s, i) => (
                    <div
                        key={s.title}
                        className="p-6 border border-[rgba(0,255,170,0.08)] bg-[rgba(255,255,255,0.01)]
              group relative overflow-hidden cursor-default
              hover:border-[rgba(0,255,170,0.25)] hover:-translate-y-1
              transition-all duration-300 reveal opacity-0 translate-y-8"
                        style={{ transitionDuration: '700ms', transitionDelay: `${i * 70 + 100}ms` }}
                    >
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,255,170,0.03)] to-[rgba(0,180,255,0.03)]
              opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        <div className="text-2xl mb-4">{s.icon}</div>
                        <h3 className="font-semibold text-base mb-2">{s.title}</h3>
                        <p className="font-mono-custom text-[0.72rem] text-[#6b7280] leading-relaxed mb-4">{s.desc}</p>
                        <div className="flex flex-wrap gap-1.5">
                            {s.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="font-mono-custom text-[0.58rem] text-[#00b4ff] border border-[rgba(0,180,255,0.25)]
                    bg-[rgba(0,180,255,0.05)] px-2 py-0.5 tracking-wide"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

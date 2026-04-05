import { useEffect, useRef } from 'react'

const APPROACH = [
    { num: '01', title: 'Security Research', desc: 'SSH brute-force detection, keylogger analysis, hybrid cryptography, threat modeling' },
    { num: '02', title: 'ML & Geospatial Systems', desc: 'YOLO infrastructure detection, SegFormer segmentation, astrophysics data pipelines' },
    { num: '03', title: 'Embedded & Autonomous Systems', desc: 'Jetson Orin Nano, Raspberry Pi, edge ML deployment, drone R&D with Team Ardra' },
    { num: '04', title: 'Technical Writing & Research', desc: 'Co-authored nuclear thermal rocket propulsion paper; ISA astronomy research' },
]

export default function About() {
    const sectionRef = useRef<HTMLElement>(null)

    /* Scroll reveal */
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
            id="about"
            ref={sectionRef}
            className="relative z-10 grid grid-cols-2 gap-24 items-center px-16 py-32 border-t border-[rgba(0,255,170,0.06)]"
        >
            {/* LEFT — text */}
            <div>
                <div className="section-tag mb-3 reveal opacity-0 translate-y-8 transition-all duration-700">
                    About Me
                </div>
                <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight leading-tight mb-6 reveal opacity-0 translate-y-8 transition-all duration-700 delay-100">
                    Security-First.<br />
                    <span className="text-gradient">Systems Thinker.</span>
                </h2>
                <p className="text-[#9ca3af] text-base leading-relaxed mb-4 reveal opacity-0 translate-y-8 transition-all duration-700 delay-150">
                    I'm a <strong className="text-[#e8eaf0]">2nd-year B.Tech CSE (Cyber Security)</strong> student at
                    VIT Vellore with a CGPA of 8.70. I sit at the intersection of cybersecurity, machine learning,
                    and systems engineering — building tools that solve real problems.
                </p>
                <p className="text-[#9ca3af] text-base leading-relaxed reveal opacity-0 translate-y-8 transition-all duration-700 delay-200">
                    Outside code, I research <strong className="text-[#e8eaf0]">nuclear propulsion</strong>, contribute
                    to <strong className="text-[#e8eaf0]">autonomous drone systems</strong>, and spend time with
                    astrophysics datasets. The best security engineers understand how things break — so they can build
                    what doesn't.
                </p>

                {/* Education badge */}
                <div className="mt-8 p-4 glass-accent reveal opacity-0 translate-y-8 transition-all duration-700 delay-300">
                    <div className="font-mono-custom text-[0.62rem] text-[#00ffaa] tracking-widest uppercase mb-1">Education</div>
                    <div className="font-semibold text-sm">Vellore Institute of Technology, Vellore</div>
                    <div className="font-mono-custom text-[0.7rem] text-[#6b7280] mt-1">B.Tech CSE (Cyber Security) · Jul 2024 – May 2028 · CGPA: 8.70</div>
                </div>
            </div>

            {/* RIGHT — approach cards */}
            <div className="flex flex-col gap-4">
                {APPROACH.map((item, i) => (
                    <div
                        key={item.num}
                        className="flex items-start gap-4 p-4 border border-[rgba(0,255,170,0.08)] bg-[rgba(255,255,255,0.01)]
              hover:border-[rgba(0,255,170,0.25)] hover:bg-[rgba(0,255,170,0.03)]
              transition-all duration-300 reveal opacity-0 translate-y-8"
                        style={{ transitionDuration: '700ms', transitionDelay: `${i * 80 + 200}ms` }}
                    >
                        <span className="font-mono-custom text-[0.62rem] text-[#00ffaa] tracking-wider pt-0.5 shrink-0">
                            {item.num}
                        </span>
                        <div>
                            <strong className="block text-sm font-semibold mb-1">{item.title}</strong>
                            <p className="font-mono-custom text-[0.72rem] text-[#6b7280] leading-relaxed">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

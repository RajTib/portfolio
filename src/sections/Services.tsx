export const Services = () => {
    const services = [
        {
            title: "UI/UX Design",
            desc: "Clean, user-focused layouts with smooth navigation and strong hierarchy.",
            tags: ["Modern layouts", "Responsive design"],
        },
        {
            title: "Frontend Development",
            desc: "Responsive interfaces using HTML, CSS, and JavaScript.",
            tags: ["Clean code", "Smooth interactions"],
        },
        {
            title: "Performance & Responsiveness",
            desc: "Fast, mobile-first websites optimized for speed.",
            tags: ["Speed optimization", "Asset efficiency"],
        },
        {
            title: "Systems Thinking",
            desc: "Building scalable systems with real-world impact.",
            tags: ["Architecture", "Automation"],
        },
    ];

    return (
        <section className="py-12 px-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Services</h2>
            <p className="text-center text-slate-500 mb-12">
                Designing clean scalable responsive systems
            </p>

            <div className="grid md:grid-cols-4 gap-6">
                {services.map((s, i) => (
                    <div
                        key={i}
                        className="p-6 rounded-xl border-glow bg-white/[0.02] hover-glow transition"
                    >
                        <h3 className="font-semibold mb-3">{s.title}</h3>
                        <p className="text-sm text-slate-400 mb-4">{s.desc}</p>

                        <div className="flex flex-wrap gap-2">
                            {s.tags.map((t) => (
                                <span
                                    key={t}
                                    className="text-xs px-2 py-1 border border-white/10 rounded-md text-slate-400"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

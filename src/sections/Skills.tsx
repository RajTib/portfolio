export const Skills = () => {
    const groups = [
        {
            title: "Core Skills",
            items: ["System Design", "Cybersecurity", "Automation"],
        },
        {
            title: "Frontend Tech",
            items: ["HTML", "CSS", "JS", "React"],
        },
        {
            title: "Tools",
            items: ["GitHub", "Firebase", "Linux"],
        },
        {
            title: "Interaction",
            items: ["UI Motion", "UX Thinking"],
        },
    ];

    return (
        <section className="py-12 px-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>

            <div className="grid md:grid-cols-4 gap-6">
                {groups.map((g, i) => (
                    <div
                        key={i}
                        className="p-6 rounded-xl border border-white/10 bg-white/[0.02]"
                    >
                        <h3 className="font-semibold mb-4">{g.title}</h3>

                        <div className="flex flex-wrap gap-2">
                            {g.items.map((item) => (
                                <span
                                    key={item}
                                    className="text-xs px-3 py-1 rounded-md bg-white/5 text-slate-400"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

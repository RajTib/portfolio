export const About = () => {
    return (
        <section className="py-12 px-6 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">About Me</h2>

            <p className="text-slate-400 leading-relaxed mb-12">
                I’m a cybersecurity student and system builder focused on crafting
                responsive, intelligent systems. I love turning abstract ideas into
                real-world applications that actually react.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
                {[
                    "Understand users & systems",
                    "Design clean architecture",
                    "Build responsive experiences",
                ].map((item, i) => (
                    <div
                        key={i}
                        className="p-4 rounded-xl border border-white/10 bg-white/[0.02]"
                    >
                        {item}
                    </div>
                ))}
            </div>
        </section>
    );
};

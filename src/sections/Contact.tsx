export const Contact = () => (
  <section className="py-32 px-4 text-center">
    <div className="glass max-w-4xl mx-auto p-12 rounded-3xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      <h2 className="text-4xl font-bold mb-6">Let's build the future.</h2>
      <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">
        Open to collaborations, high-level systems architecture, or just talking tech.
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <a href="mailto:raj.tibarewala@gmail.com" className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-purple-400 transition-colors">
          Send an Email
        </a>
        <a href="https://www.linkedin.com/in/raj-tibarewala/" className="px-8 py-4 rounded-full glass font-bold hover:bg-white/10 transition-colors">
          LinkedIn
        </a>
      </div>
    </div>
    <p className="mt-20 text-slate-600 font-mono text-xs uppercase tracking-[0.5em]">
      © 2026D RAJ TIBAREWALA • SYSTEM ARCHITECT
    </p>
  </section>
);

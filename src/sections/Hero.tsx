import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export const Hero = () => (
  <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-sm font-mono tracking-[0.3em] text-purple-500 uppercase mb-4">Engineering Systems</h2>
      <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight tracking-tighter leading-none">
        Raj <span className="text-gradient">Tibarewala</span>
      </h1>
      <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed mb-10">
        Cybersecurity <span className="mx-2 text-white/20">•</span>
        Systems <span className="mx-2 text-white/20">•</span>
        Builder
      </p>

      <div className="flex gap-6 justify-center">
        {[
            { Icon: FaGithub, href: "#" },
            { Icon: FaLinkedin, href: "#" },
            { Icon: FaInstagram, href: "#" }
        ].map((_social, i) => (
          <a
            key={i}
            // href={social.href}
            className="p-3 glass rounded-full hover:scale-110 hover:text-purple-400 transition-all"
          >
            {/* <social.Icon size={24} /> */}
          </a>
        ))}
      </div>
    </motion.div>
  </section>
);

import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-between px-10 max-w-7xl mx-auto">

      {/* LEFT */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-xl"
      >
        <p className="text-slate-400 mb-3">I am Raj</p>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Cyber Security <br />
          <span className="text-gradient">Student & Builder</span>
        </h1>

        <p className="text-slate-400 mt-5">
          I build systems that respond — not just interfaces that sit still.
        </p>

        <button className="mt-6 px-6 py-3 rounded-lg glass hover:border-purple-500/50 transition">
          Download CV
        </button>
      </motion.div>

      {/* RIGHT IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="hidden md:block"
      >
        <img
          src="src\assets\my-pic.JPG"
          alt="raj"
          className="w-[350px] grayscale opacity-90"
        />
      </motion.div>
    </section>
  );
};


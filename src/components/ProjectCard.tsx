import { motion } from 'framer-motion';
import type { Project } from '../data/projects';

export const ProjectCard = ({ project }: { project: Project }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="glass p-8 rounded-2xl group relative overflow-hidden transition-all hover:border-purple-500/50 hover:shadow-[0_0_30px_-10px_rgba(168,85,247,0.4)]"
  >
    <div className="absolute top-0 right-0 p-4">
      <span className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 ${project.status === 'Flagship' ? 'bg-purple-500/20 text-purple-300' : 'bg-white/5 text-slate-400'}`}>
        {project.status}
      </span>
    </div>
    <h3 className="text-2xl font-bold mb-3 mt-4 text-white group-hover:text-purple-400 transition-colors">
      {project.title}
    </h3>
    <p className="text-slate-400 leading-relaxed mb-6">
      {project.description}
    </p>
    <div className="flex flex-wrap gap-2">
      {project.tech.map(t => (
        <span key={t} className="text-xs font-mono text-slate-500">#{t}</span>
      ))}
    </div>
  </motion.div>
);

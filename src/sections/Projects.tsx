import { projects } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';

export const Projects = () => (
  <section className="py-24 px-4 max-w-6xl mx-auto">
    <div className="flex items-end gap-4 mb-12">
      <h2 className="text-4xl font-bold tracking-tight">Active Projects</h2>
      <div className="h-[1px] flex-grow bg-gradient-to-r from-white/20 to-transparent mb-3" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((p, i) => <ProjectCard key={i} project={p} />)}
    </div>
  </section>
);
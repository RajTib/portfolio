import type { Idea } from '../data/ideas';

const statusColors = {
  Build: 'text-blue-400',
  Parked: 'text-slate-500',
  Building: 'text-purple-400',
  Passive: 'text-emerald-400'
};

export const IdeaCard = ({ idea }: { idea: Idea }) => (
  <div className="group flex items-center justify-between p-4 glass rounded-xl hover:bg-white/[0.07] transition-all cursor-default">
    <span className="text-lg font-medium text-slate-300 group-hover:text-white transition-colors">{idea.name}</span>
    <div className="flex items-center gap-3">
      <div className={`w-1.5 h-1.5 rounded-full bg-current ${statusColors[idea.status]}`} />
      <span className={`text-xs font-mono uppercase tracking-tighter ${statusColors[idea.status]}`}>
        {idea.status}
      </span>
    </div>
  </div>
);

import { ideas } from '../data/ideas';
import { IdeaCard } from '../components/IdeaCard';

export const IdeaVault = () => (
  <section className="py-24 px-4 max-w-3xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold mb-4">Idea Vault</h2>
      <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">System Roadmap & Active Thoughts</p>
    </div>
    <div className="grid gap-3">
      {ideas.map((idea, i) => <IdeaCard key={i} idea={idea} />)}
    </div>
  </section>
);
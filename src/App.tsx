import { GlowBlob } from './components/GlowBlob';
import { Hero } from './sections/Hero';
import { Services } from './sections/Services';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { IdeaVault } from './sections/IdeaVault';
import { Contact } from './sections/Contact';

function App() {
  return (
    <main className="relative min-h-screen overflow-hidden">

      <GlowBlob className="top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600" />
      <GlowBlob className="bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-600" />

      <Hero />
      <Services />
      <About />
      <Skills />
      <Projects />
      <IdeaVault />
      <Contact />
    </main>
  );
}

export default App;

import { GlowBlob } from './components/GlowBlob';
import { Hero } from './sections/Hero';
import { Projects } from './sections/Projects';
import { IdeaVault } from './sections/IdeaVault';
import { Contact } from './sections/Contact';

function App() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Aesthetic Blobs */}
      <GlowBlob className="top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600" />
      <GlowBlob className="bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-600" />
      <GlowBlob className="top-[40%] left-[20%] w-[400px] h-[400px] bg-pink-600 opacity-10" />

      {/* Sections */}
      <Hero />
      <Projects />
      <IdeaVault />
      <Contact />
    </main>
  );
}

export default App;
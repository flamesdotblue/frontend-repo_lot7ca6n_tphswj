import { useEffect, useMemo, useState } from 'react';
import HeroGenerator from './components/HeroGenerator.jsx';
import CustomizationPanel from './components/CustomizationPanel.jsx';
import ProjectsEditor from './components/ProjectsEditor.jsx';
import PortfolioPreview from './components/PortfolioPreview.jsx';

function createSampleProjects(style) {
  const tags = {
    minimal: ['UI', 'Clean', 'System'],
    modern: ['Next.js', 'AI', 'Cloud'],
    creative: ['Motion', '3D', 'Art'],
    bold: ['Brand', 'Dark', 'Impact'],
  }[style] || ['Web', 'Design', 'Build'];

  return new Array(6).fill(0).map((_, i) => ({
    title: `Project ${i + 1}`,
    description: 'A thoughtfully crafted project showcasing my capabilities across design and engineering.',
    tags: [tags[i % tags.length], tags[(i + 1) % tags.length]],
    image: '',
  }));
}

export default function App() {
  const [generated, setGenerated] = useState(false);
  const [form, setForm] = useState({ name: '', profession: '', bio: '', stylePref: 'modern' });
  const [projects, setProjects] = useState([]);
  const [settings, setSettings] = useState({
    palette: { name: 'Aurora', primary: '#7C3AED', secondary: '#06B6D4', bg: '#0B0B0F', text: '#E5E7EB' },
    fonts: { name: 'Inter + Geist', heading: 'Geist, Inter, system-ui, sans-serif', body: 'Inter, system-ui, sans-serif' },
    layout: 'grid',
  });

  // Load state from shareable link hash
  useEffect(() => {
    if (window.location.hash.length > 1) {
      try {
        const raw = window.location.hash.substring(1);
        const { data, settings: s } = JSON.parse(decodeURIComponent(escape(atob(raw))));
        if (data?.name) {
          setForm({ name: data.name, profession: data.profession, bio: data.bio, stylePref: 'modern' });
          setProjects(data.projects || []);
          if (s) setSettings(s);
          setGenerated(true);
        }
      } catch (e) {
        // ignore invalid hash
      }
    }
  }, []);

  const handleGenerate = ({ name, profession, bio, stylePref }) => {
    setForm({ name, profession, bio, stylePref });
    setProjects(createSampleProjects(stylePref));
    setGenerated(true);
  };

  const data = useMemo(() => ({
    name: form.name || 'Your Name',
    profession: form.profession || 'Your Profession',
    bio: form.bio || 'Brief description about your work and philosophy.',
    projects,
  }), [form, projects]);

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {!generated && (
        <HeroGenerator onGenerate={handleGenerate} initialValues={form} />
      )}

      {generated && (
        <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-10 md:grid-cols-[360px,1fr]">
          <div className="order-2 md:order-1 space-y-6">
            <CustomizationPanel settings={settings} onChange={setSettings} />
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white backdrop-blur">
              <div className="mb-3 text-sm text-white/80">Projects</div>
              <ProjectsEditor projects={projects} setProjects={setProjects} />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <PortfolioPreview data={data} settings={settings} />
          </div>
        </main>
      )}

      <footer className="mx-auto max-w-6xl px-4 pb-10 text-center text-xs text-white/50">
        Built with modern UI, animations, and responsive design. Print to PDF or share your link.
      </footer>
    </div>
  );
}

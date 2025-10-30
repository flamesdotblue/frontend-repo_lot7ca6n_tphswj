import { Download, Link as LinkIcon, FileCode } from 'lucide-react';

function classNames(...c) { return c.filter(Boolean).join(' '); }

export default function PortfolioPreview({ data, settings }) {
  const palette = settings.palette || { primary: '#7C3AED', secondary: '#06B6D4', bg: '#0B0B0F', text: '#E5E7EB' };
  const fonts = settings.fonts || { heading: 'Inter, system-ui, sans-serif', body: 'Inter, system-ui, sans-serif' };
  const layout = settings.layout || 'grid';

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = async () => {
    try {
      const payload = btoa(unescape(encodeURIComponent(JSON.stringify({ data, settings }))));
      const url = `${window.location.origin}${window.location.pathname}#${payload}`;
      await navigator.clipboard.writeText(url);
      alert('Shareable link copied to clipboard');
    } catch (e) {
      alert('Failed to copy link');
    }
  };

  const handleExportSpecs = () => {
    const specs = {
      colors: palette,
      fonts,
      layout,
      components: ['Hero', 'About', 'Projects Grid', 'Contact'],
    };
    const blob = new Blob([JSON.stringify(specs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'design-specs.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const sectionStyles = {
    backgroundColor: palette.bg,
    color: palette.text,
    fontFamily: fonts.body,
  };
  const headingStyle = { fontFamily: fonts.heading };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
        <div className="text-sm text-white/80">Live preview</div>
        <div className="flex items-center gap-2">
          <button onClick={handlePrint} className="inline-flex items-center gap-1 rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/80 hover:border-white/30">
            <Download className="h-3.5 w-3.5" /> PDF
          </button>
          <button onClick={handleCopyLink} className="inline-flex items-center gap-1 rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/80 hover:border-white/30">
            <LinkIcon className="h-3.5 w-3.5" /> Share link
          </button>
          <button onClick={handleExportSpecs} className="inline-flex items-center gap-1 rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/80 hover:border-white/30">
            <FileCode className="h-3.5 w-3.5" /> Design specs
          </button>
        </div>
      </div>

      <div className="space-y-12 p-6" style={sectionStyles}>
        {/* Hero */}
        <section className="relative overflow-hidden rounded-2xl p-8 md:p-12" style={{ background: `linear-gradient(135deg, ${palette.primary}22, ${palette.secondary}22)` }}>
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-3xl" style={{ backgroundColor: palette.primary }} />
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full opacity-30 blur-3xl" style={{ backgroundColor: palette.secondary }} />
          <div className="relative">
            <h2 className="text-3xl font-bold md:text-5xl" style={headingStyle}>{data.name}</h2>
            <p className="mt-1 text-sm uppercase tracking-widest text-white/70">{data.profession}</p>
            <p className="mt-4 max-w-2xl text-white/85">{data.bio}</p>
            <div className="mt-6 inline-flex items-center gap-2">
              <a href="#projects" className="rounded-full px-4 py-2 text-sm font-medium" style={{ backgroundColor: palette.primary, color: '#0B0B0F' }}>View Projects</a>
              <a href="#contact" className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 hover:border-white/30">Contact</a>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="rounded-2xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold" style={headingStyle}>About</h3>
          <p className="mt-2 max-w-3xl text-white/80">{data.bio || 'Passionate builder creating delightful digital experiences.'}</p>
        </section>

        {/* Projects */}
        <section id="projects" className="rounded-2xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold" style={headingStyle}>Projects</h3>
            <div className="text-xs text-white/60">Drag to reorder, click to edit in the panel</div>
          </div>

          <div className={classNames(
            layout === 'grid' ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-3',
          )}>
            {data.projects.map((p, i) => (
              <article key={i} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <div className="aspect-[16/10] w-full bg-white/5">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-white/40">Image</div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold" style={headingStyle}>{p.title}</h4>
                  <p className="mt-1 text-sm text-white/80">{p.description}</p>
                  {p.tags?.length ? (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {p.tags.map((t, idx) => (
                        <span key={idx} className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/70">{t}</span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="rounded-2xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold" style={headingStyle}>Contact</h3>
          <form className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input placeholder="Your name" className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 outline-none focus:border-white/30" />
            <input type="email" placeholder="Email" className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 outline-none focus:border-white/30" />
            <textarea placeholder="Message" className="sm:col-span-2 min-h-[100px] w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 outline-none focus:border-white/30" />
            <div>
              <button type="button" className="rounded-lg px-4 py-2 font-medium" style={{ backgroundColor: palette.secondary, color: '#0B0B0F' }}>Send</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

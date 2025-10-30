import { Palette, LayoutGrid, Type } from 'lucide-react';

const palettes = [
  { name: 'Aurora', primary: '#7C3AED', secondary: '#06B6D4', bg: '#0B0B0F', text: '#E5E7EB' },
  { name: 'Sunset', primary: '#F59E0B', secondary: '#EF4444', bg: '#0A0A0A', text: '#F3F4F6' },
  { name: 'Ocean', primary: '#0EA5E9', secondary: '#22D3EE', bg: '#06131E', text: '#E2E8F0' },
  { name: 'Forest', primary: '#22C55E', secondary: '#14B8A6', bg: '#07110A', text: '#DCFCE7' },
  { name: 'Mono', primary: '#FFFFFF', secondary: '#9CA3AF', bg: '#0B0B0B', text: '#F9FAFB' },
];

const fontPairs = [
  { name: 'Inter + Geist', heading: 'Geist, Inter, system-ui, sans-serif', body: 'Inter, system-ui, sans-serif' },
  { name: 'Manrope + Inter', heading: 'Manrope, Inter, system-ui, sans-serif', body: 'Inter, system-ui, sans-serif' },
  { name: 'IBM Plex Sans + Inter', heading: 'IBM Plex Sans, Inter, system-ui, sans-serif', body: 'Inter, system-ui, sans-serif' },
];

export default function CustomizationPanel({ settings, onChange }) {
  const set = (partial) => onChange({ ...settings, ...partial });

  return (
    <div className="sticky top-4 flex w-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-white backdrop-blur">
      <div className="flex items-center gap-2 text-white/80">
        <Palette className="h-4 w-4" />
        <span className="text-sm">Color scheme</span>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {palettes.map((p) => (
          <button
            key={p.name}
            onClick={() => set({ palette: p })}
            className={`flex items-center gap-2 rounded-xl border p-3 text-left transition ${
              settings.palette?.name === p.name ? 'border-white/70 bg-white/10' : 'border-white/10 hover:border-white/20'
            }`}
          >
            <span className="inline-flex h-5 w-5 overflow-hidden rounded-full">
              <span className="h-full w-1/2" style={{ backgroundColor: p.primary }} />
              <span className="h-full w-1/2" style={{ backgroundColor: p.secondary }} />
            </span>
            <span className="text-sm">{p.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-2 text-white/80">
        <Type className="h-4 w-4" />
        <span className="text-sm">Font pairing</span>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {fontPairs.map((f) => (
          <button
            key={f.name}
            onClick={() => set({ fonts: f })}
            className={`rounded-xl border p-3 text-left transition ${
              settings.fonts?.name === f.name ? 'border-white/70 bg-white/10' : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className="text-sm" style={{ fontFamily: f.heading }}>Heading</div>
            <div className="text-xs text-white/70" style={{ fontFamily: f.body }}>Body text preview</div>
          </button>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-2 text-white/80">
        <LayoutGrid className="h-4 w-4" />
        <span className="text-sm">Layout</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {['single', 'grid'].map((l) => (
          <button
            key={l}
            onClick={() => set({ layout: l })}
            className={`rounded-xl border p-3 text-center capitalize transition ${
              settings.layout === l ? 'border-white/70 bg-white/10' : 'border-white/10 hover:border-white/20'
            }`}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

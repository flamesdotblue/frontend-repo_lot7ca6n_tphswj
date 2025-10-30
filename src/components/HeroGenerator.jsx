import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function HeroGenerator({ onGenerate, initialValues }) {
  const [name, setName] = useState(initialValues.name || '');
  const [profession, setProfession] = useState(initialValues.profession || '');
  const [bio, setBio] = useState(initialValues.bio || '');
  const [stylePref, setStylePref] = useState(initialValues.stylePref || 'modern');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      onGenerate({ name, profession, bio, stylePref });
      setLoading(false);
    }, 1800);
  };

  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Subtle radial gradient overlay to enhance contrast without blocking interaction */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.25)_55%,rgba(0,0,0,0.6)_100%)]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-center px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur"
        >
          <Rocket className="h-4 w-4 text-white/80" />
          <span className="text-sm text-white/80">AI Portfolio Generator</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-balance bg-gradient-to-b from-white to-white/70 bg-clip-text text-4xl font-semibold leading-tight text-transparent md:text-6xl"
        >
          Launch a beautiful portfolio in seconds
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 max-w-2xl text-pretty text-base text-white/80 md:text-lg"
        >
          Describe yourself, pick a style, and let the AI craft a clean, modern, and responsive portfolio. Customize in real time and export instantly.
        </motion.p>

        <AnimatePresence>
          {!loading && (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-10 grid w-full grid-cols-1 gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur md:grid-cols-2"
            >
              <div className="flex flex-col gap-2">
                <label className="text-left text-sm text-white/80">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-white/30"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-left text-sm text-white/80">Profession</label>
                <input
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder="AI Researcher / Designer"
                  className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-white/30"
                  required
                />
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-left text-sm text-white/80">Short bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="I blend machine intelligence with human-centered design to build magical products."
                  className="min-h-[90px] w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-left text-sm text-white/80">Preferred style</label>
                <select
                  value={stylePref}
                  onChange={(e) => setStylePref(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-white/30"
                >
                  <option value="minimal">Minimal</option>
                  <option value="modern">Modern</option>
                  <option value="creative">Creative</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
              <div className="md:col-span-2 flex items-end justify-center">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:bg-white/90"
                >
                  <Rocket className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  Generate Portfolio
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-10 flex flex-col items-center gap-3"
            >
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <p className="text-white/80">Crafting your sections and sample projects…</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

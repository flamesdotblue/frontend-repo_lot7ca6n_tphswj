import { useState } from 'react';
import { Image as ImageIcon, GripVertical, Edit3 } from 'lucide-react';

function DraggableProjectCard({ project, index, onDragStart, onDragOver, onDrop, onChange, onImage }) {
  const [editing, setEditing] = useState(false);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e, index)}
      className="group relative grid grid-cols-[56px,1fr] gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-white backdrop-blur"
    >
      <div className="flex items-center justify-center rounded-lg border border-white/10 bg-white/5">
        {project.image ? (
          <img src={project.image} alt="thumb" className="h-12 w-12 rounded-md object-cover" />
        ) : (
          <ImageIcon className="h-5 w-5 text-white/60" />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <input
            className="w-full rounded-md border border-white/10 bg-transparent px-2 py-1 font-medium outline-none focus:border-white/30"
            value={project.title}
            onChange={(e) => onChange(index, { title: e.target.value })}
          />
          <button type="button" onClick={() => setEditing((v) => !v)} className="ml-2 inline-flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-xs text-white/80 hover:border-white/30">
            <Edit3 className="h-3.5 w-3.5" /> Edit
          </button>
        </div>
        {editing && (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <textarea
              className="min-h-[60px] w-full rounded-md border border-white/10 bg-transparent px-2 py-1 text-sm outline-none focus:border-white/30"
              value={project.description}
              onChange={(e) => onChange(index, { description: e.target.value })}
            />
            <input
              className="w-full rounded-md border border-white/10 bg-transparent px-2 py-1 text-sm outline-none focus:border-white/30"
              placeholder="tags, comma, separated"
              value={project.tags?.join(', ')}
              onChange={(e) => onChange(index, { tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })}
            />
            <div className="col-span-1 md:col-span-2 flex items-center justify-between">
              <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-white/80">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onImage(index, e.target.files?.[0] || null)}
                />
                <span className="inline-flex items-center gap-1 rounded border border-white/10 px-2 py-1 hover:border-white/30">
                  <ImageIcon className="h-3.5 w-3.5" /> Upload thumbnail
                </span>
              </label>
              <span className="inline-flex items-center gap-1 text-xs text-white/50"><GripVertical className="h-3.5 w-3.5" /> drag</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectsEditor({ projects, setProjects }) {
  const [dragIndex, setDragIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const newList = [...projects];
    const [moved] = newList.splice(dragIndex, 1);
    newList.splice(index, 0, moved);
    setProjects(newList);
    setDragIndex(null);
  };

  const handleChange = (index, partial) => {
    const updated = projects.map((p, i) => (i === index ? { ...p, ...partial } : p));
    setProjects(updated);
  };

  const handleImage = (index, file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    handleChange(index, { image: url });
  };

  return (
    <div className="flex flex-col gap-3">
      {projects.map((project, i) => (
        <DraggableProjectCard
          key={i}
          project={project}
          index={i}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onChange={handleChange}
          onImage={handleImage}
        />
      ))}
    </div>
  );
}

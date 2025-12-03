import React, { useState, useEffect, useRef } from 'react';

export default function ProfilePage({ profile, onChange, onClose }) {
  const [local, setLocal] = useState(profile ?? { name: 'Guest', avatar: null });
  const fileRef = useRef(null);

  useEffect(() => {
    setLocal(profile ?? { name: 'Guest', avatar: null });
  }, [profile]);

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setLocal((p) => ({ ...p, avatar: r.result }));
    r.readAsDataURL(f);
  };

  const save = () => {
    if (onChange) onChange(local);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-xl shadow-xl w-full max-w-lg p-6 text-white">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-semibold">Profile Settings</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">Close</button>
        </div>

        <div className="mt-4 flex gap-4">
          <div>
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/10">
              <img src={local.avatar || 'https://picsum.photos/120/120?grayscale'} alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div className="mt-3">
              <button type="button" onClick={() => fileRef.current.click()} className="px-3 py-1 bg-indigo-600 rounded">Change Avatar</button>
              <input ref={fileRef} type="file" accept="image/*" onChange={onFile} style={{ display: 'none' }} />
            </div>
          </div>

          <div className="flex-1">
            <label className="block text-sm text-white/70">Display name</label>
            <input
              value={local.name}
              onChange={(e) => setLocal((p) => ({ ...p, name: e.target.value }))}
              className="w-full mt-1 p-2 rounded bg-white/5 outline-none"
            />

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 rounded bg-white/6">Cancel</button>
              <button onClick={save} className="px-4 py-2 rounded bg-indigo-600">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
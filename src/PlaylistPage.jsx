import React, { useState } from 'react';

export default function PlaylistPage({ playlist, allTracks, onClose, onAddTrack, onRemoveTrack }) {
  const [selectedTrackId, setSelectedTrackId] = useState('');

  const handleAddTrack = () => {
    if (selectedTrackId) {
      const track = allTracks.find((t) => t.id === parseInt(selectedTrackId));
      if (track && !playlist.tracks.find((t) => t.id === track.id)) {
        onAddTrack(track);
        setSelectedTrackId('');
      }
    }
  };

  const availableTracks = allTracks.filter((t) => !playlist.tracks.find((pt) => pt.id === t.id));

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">{playlist.name}</h2>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
          >
            Close
          </button>
        </div>

        {/* Add Track Section */}
        <div className="bg-white/5 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-lg mb-4">Add Existing Track</h3>
          <div className="space-y-3">
            <select
              value={selectedTrackId}
              onChange={(e) => setSelectedTrackId(e.target.value)}
              className="w-full rounded-lg bg-white/10 p-3 outline-none text-white"
            >
              <option value="" className="bg-slate-900 text-white">Select a track to add...</option>
              {availableTracks.map((t) => (
                <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                  {t.title} - {t.artist}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddTrack}
              disabled={!selectedTrackId}
              className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-600 transition font-semibold"
            >
              Add Track
            </button>
          </div>
        </div>

        {/* Tracks List */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Tracks ({playlist.tracks?.length || 0})</h3>
          {playlist.tracks && playlist.tracks.length > 0 ? (
            <div className="space-y-3">
              {playlist.tracks.map((track) => (
                <div key={track.id} className="bg-white/3 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={track.cover} alt="cover" className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <div className="font-semibold">{track.title}</div>
                      <div className="text-sm text-white/70">{track.artist}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveTrack(track.id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-white/60 py-8">No tracks in this playlist yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
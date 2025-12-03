import React, { useState, useRef, useEffect } from 'react';
import ProfilePage from './ProfilePage.jsx';
import PlaylistPage from './PlaylistPage.jsx';

const sampleTracks = [
  {
    id: 1,
    title: 'In The Pool',
    artist: 'Kensuke Ushio',
    src: 'src/assets/in the pool.mp3',
    cover: 'src/assets/Csm movie album.png'
  },
  {
    id: 2,
    title: 'First Glance',
    artist: 'Kensuke Ushio',
    src: 'src/assets/first glance.mp3',
    cover: 'src/assets/Csm movie album.png'
  },
  {
    id: 3,
    title: 'Jane Doe',
    artist: 'Kensuke Yonezu,Hikaru Utada',
    src: 'src/assets/Jane Doe.mp3',
    cover: 'src/assets/Jane Doe song album.jpg'
  }
];

const samplePlaylists = [
  {
    id: 1,
    name: 'Chainsawman Movie OST',
    cover: 'src/assets/Chainsawman movie ost playlist album.jpg',
    trackCount: 1,
    tracks: [sampleTracks[0]]
  }
];

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [allTracks] = useState(sampleTracks);
  const [playlists, setPlaylists] = useState(samplePlaylists);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const [profile, setProfile] = useState(() => {
    try {
      const v = localStorage.getItem('vibez_profile');
      return v ? JSON.parse(v) : { name: 'Guest', avatar: null };
    } catch {
      return { name: 'Guest', avatar: null };
    }
  });

  const [showProfilePage, setShowProfilePage] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('vibez_profile', JSON.stringify(profile));
    } catch {}
  }, [profile]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => setProgress((audio.currentTime / (audio.duration || 1)) * 100 || 0);
    const onEnded = () => handleNext();
    audio.addEventListener('timeupdate', update);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', update);
      audio.removeEventListener('ended', onEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, currentPlaylist]);

  const getCurrentPlaylist = () => {
    return currentPlaylist || allTracks;
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!progressRef.current || !audio) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    if (audio && audio.duration) {
      audio.currentTime = pct * audio.duration;
      setProgress(pct * 100);
    }
  };

  const handleNext = () => {
    const playlist = getCurrentPlaylist();
    setIsPlaying(false);
    setCurrentIndex((i) => (i + 1) % playlist.length);
    setTimeout(() => {
      const audio = audioRef.current;
      if (audio) {
        audio.play();
        setIsPlaying(true);
      }
    }, 200);
  };

  const handlePrev = () => {
    const playlist = getCurrentPlaylist();
    setIsPlaying(false);
    setCurrentIndex((i) => (i - 1 + playlist.length) % playlist.length);
    setTimeout(() => {
      const audio = audioRef.current;
      if (audio) {
        audio.play();
        setIsPlaying(true);
      }
    }, 200);
  };

  const selectTrack = (index) => {
    setCurrentIndex(index);
    setIsPlaying(false);
    setTimeout(() => {
      const audio = audioRef.current;
      if (audio) {
        audio.play();
        setIsPlaying(true);
      }
    }, 200);
  };

  const handlePlaylistClick = (pl) => {
    setCurrentPlaylist(pl.tracks);
    setCurrentIndex(0);
    setIsPlaying(false);
    setSelectedPlaylist(pl);
  };

  const handleAddTrack = (newTrack) => {
    setPlaylists(
      playlists.map((pl) =>
        pl.id === selectedPlaylist.id
          ? { ...pl, tracks: [...(pl.tracks || []), newTrack], trackCount: (pl.tracks?.length || 0) + 1 }
          : pl
      )
    );
    setSelectedPlaylist((prev) => ({
      ...prev,
      tracks: [...(prev.tracks || []), newTrack],
      trackCount: (prev.tracks?.length || 0) + 1
    }));
    setCurrentPlaylist((prev) => [...prev, newTrack]);
  };

  const handleRemoveTrack = (trackId) => {
    setPlaylists(
      playlists.map((pl) =>
        pl.id === selectedPlaylist.id
          ? {
              ...pl,
              tracks: pl.tracks.filter((t) => t.id !== trackId),
              trackCount: pl.tracks.length - 1
            }
          : pl
      )
    );
    setSelectedPlaylist((prev) => ({
      ...prev,
      tracks: prev.tracks.filter((t) => t.id !== trackId),
      trackCount: prev.tracks.length - 1
    }));
    setCurrentPlaylist((prev) => prev.filter((t) => t.id !== trackId));
  };

  const currentPlaylistTracks = getCurrentPlaylist();
  const current = currentPlaylistTracks[currentIndex];

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) setLoggedIn(true);
    else alert('Enter email and password (demo)');
  };

  return (
    <div className="min-h-screen pb-32 bg-gradient-to-b from-slate-900 to-indigo-900 text-white flex flex-col">
      {!loggedIn ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">VIBEZ</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full rounded-lg bg-white/10 p-3 outline-none"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-lg bg-white/10 p-3 outline-none"
              />
              <button className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition">Login</button>
            </form>
          </div>
        </div>
      ) : (
        <>
          {/* Top: Discover (full width) */}
          <div className="w-full p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-6xl font-bold">Discover</h2>

                <div className="flex items-center gap-3">
                  {/* Search on the left */}
                  <div className="mr-4">
                    <input placeholder="Search" className="rounded-lg bg-white/5 p-2 outline-none w-64 md:w-96" />
                  </div>

                  {/* Profile avatar on the right - increased 1.2x */}
                  <div className="hidden md:flex items-center gap-3">
                    <div className="text-[0.96rem] text-white/70 hidden lg:block">{profile.name}</div>
                    <button
                      onClick={() => setShowProfilePage(true)}
                      title="Open profile"
                      className="w-[48px] h-[48px] rounded-full overflow-hidden border-2 border-white/10 hover:border-indigo-400 transition"
                    >
                      <img src={profile.avatar || 'https://picsum.photos/80/80?grayscale'} alt="profile" className="w-full h-full object-cover" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allTracks.map((t, i) => (
                  <div key={t.id} className="bg-white/3 rounded-lg p-4 flex gap-4 items-center">
                    <img src={t.cover} alt="cover" className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="font-semibold">{t.title}</div>
                      <div className="text-sm text-white/70">{t.artist}</div>
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => {
                            setCurrentPlaylist(null);
                            setCurrentIndex(i);
                            setIsPlaying(false);
                            setTimeout(() => {
                              const audio = audioRef.current;
                              if (audio) {
                                audio.play();
                                setIsPlaying(true);
                              }
                            }, 200);
                          }}
                          className="px-3 py-1 bg-indigo-600 rounded"
                        >
                          Play
                        </button>
                        <button className="px-3 py-1 bg-white/6 rounded">Add</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Centered panels moved slightly lower */}
          <div className="fixed left-0 right-0 top-[60%] transform -translate-y-1/2 flex justify-center items-center pointer-events-none px-6">
            <div className="w-full max-w-7xl flex gap-6 pointer-events-auto">
              {/* Playlist Albums - left (larger panel) */}
              <div className="bg-white/4 rounded-lg p-6 w-2/3 min-h-[420px]">
                <h4 className="font-semibold mb-4 text-[2.5rem] leading-tight">Playlists</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[320px] overflow-auto pr-2">
                  {playlists.map((pl) => (
                    <div
                      key={pl.id}
                      onClick={() => handlePlaylistClick(pl)}
                      className="bg-white/3 rounded-lg p-4 hover:bg-white/5 transition cursor-pointer"
                    >
                      <img src={pl.cover} alt={pl.name} className="w-full h-32 rounded-lg object-cover mb-3" />
                      <div className="font-medium text-sm">{pl.name}</div>
                      <div className="text-xs text-white/60">{pl.trackCount} song{pl.trackCount !== 1 ? 's' : ''}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Now Playing - right (smaller panel) */}
              <div className="bg-white/4 rounded-lg p-6 w-1/3 min-h-[420px] border-l border-white/5">
                <h3 className="font-semibold mb-4 text-[2.5rem] leading-tight">Now Playing</h3>
                {current ? (
                  <>
                    <div className="flex gap-3 items-center">
                      <img src={current.cover} alt="cover" className="w-20 h-20 rounded-lg object-cover" />
                      <div>
                        <div className="font-semibold">{current.title}</div>
                        <div className="text-sm text-white/70">{current.artist}</div>
                        <div className="text-xs text-white/60 mt-1">Playing as {profile.name}</div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div ref={progressRef} onClick={handleSeek} className="w-full h-3 bg-white/10 rounded cursor-pointer relative">
                        <div style={{ width: `${progress}%` }} className="h-3 bg-indigo-500 rounded" />
                      </div>

                      <div className="flex items-center justify-between mt-5">
                        <div className="flex gap-3 items-center">
                          <button onClick={handlePrev} className="p-2 bg-white/6 rounded">Prev</button>
                          <button onClick={togglePlay} className="p-3 bg-indigo-600 rounded-full">{isPlaying ? 'Pause' : 'Play'}</button>
                          <button onClick={handleNext} className="p-2 bg-white/6 rounded">Next</button>
                        </div>

                        <div className="flex items-center gap-3">
                          <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} />
                          <div className="text-sm text-white/70">{Math.round(volume * 100)}%</div>
                        </div>
                      </div>

                      <audio ref={audioRef} src={current.src} preload="metadata" />
                    </div>
                  </>
                ) : (
                  <div className="text-center text-white/60 mt-20">Select a playlist or track to play</div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {showProfilePage && <ProfilePage profile={profile} onChange={(p) => setProfile(p)} onClose={() => setShowProfilePage(false)} />}

      {selectedPlaylist && (
        <PlaylistPage
          playlist={selectedPlaylist}
          allTracks={allTracks}
          onClose={() => setSelectedPlaylist(null)}
          onAddTrack={handleAddTrack}
          onRemoveTrack={handleRemoveTrack}
        />
      )}

      {/* footer pinned to bottom */}
      <footer className="fixed bottom-4 left-0 right-0 text-center text-sm text-white/60 pointer-events-none">
        <div className="pointer-events-auto">Made by Group 1</div>
      </footer>
    </div>
  );
}
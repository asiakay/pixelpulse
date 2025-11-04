import { create } from 'zustand';
import { playlist, Track } from '@/lib/playlist';
interface PlayerState {
  playlist: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  audioRef: HTMLAudioElement | null;
  setAudioRef: (ref: HTMLAudioElement) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  playTrack: (index: number) => void;
}
export const usePlayerStore = create<PlayerState>((set, get) => ({
  playlist,
  currentTrackIndex: 0,
  isPlaying: false,
  volume: 0.5,
  currentTime: 0,
  duration: 0,
  audioRef: null,
  setAudioRef: (ref) => set({ audioRef: ref }),
  play: () => {
    const { audioRef } = get();
    if (audioRef) {
      audioRef.play().catch(e => console.error("Error playing audio:", e));
      set({ isPlaying: true });
    }
  },
  pause: () => {
    const { audioRef } = get();
    if (audioRef) {
      audioRef.pause();
      set({ isPlaying: false });
    }
  },
  togglePlay: () => {
    const { isPlaying, play, pause } = get();
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  },
  nextTrack: () => {
    const { currentTrackIndex, playlist, play } = get();
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    set({ currentTrackIndex: nextIndex, currentTime: 0 });
    setTimeout(play, 50);
  },
  prevTrack: () => {
    const { currentTrackIndex, playlist, play } = get();
    const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    set({ currentTrackIndex: prevIndex, currentTime: 0 });
    setTimeout(play, 50);
  },
  setVolume: (volume) => {
    const { audioRef } = get();
    if (audioRef) {
      audioRef.volume = volume;
    }
    set({ volume });
  },
  seek: (time) => {
    const { audioRef } = get();
    if (audioRef) {
      audioRef.currentTime = time;
    }
    set({ currentTime: time });
  },
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration: duration }),
  playTrack: (index: number) => {
    const { play } = get();
    set({ currentTrackIndex: index, currentTime: 0 });
    setTimeout(play, 50);
  },
}));
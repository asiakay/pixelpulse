import React, { useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume1, Volume2, VolumeX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePlayerStore } from '@/stores/usePlayerStore';
import AudioVisualizer from '@/components/AudioVisualizer';
import { cn } from '@/lib/utils';
const formatTime = (seconds: number) => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};
const VolumeIcon = ({ volume }: { volume: number }) => {
  if (volume === 0) return <VolumeX className="h-5 w-5" />;
  if (volume < 0.5) return <Volume1 className="h-5 w-5" />;
  return <Volume2 className="h-5 w-5" />;
};
export function HomePage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playlist = usePlayerStore(s => s.playlist);
  const currentTrackIndex = usePlayerStore(s => s.currentTrackIndex);
  const isPlaying = usePlayerStore(s => s.isPlaying);
  const volume = usePlayerStore(s => s.volume);
  const currentTime = usePlayerStore(s => s.currentTime);
  const duration = usePlayerStore(s => s.duration);
  const setAudioRef = usePlayerStore(s => s.setAudioRef);
  const togglePlay = usePlayerStore(s => s.togglePlay);
  const nextTrack = usePlayerStore(s => s.nextTrack);
  const prevTrack = usePlayerStore(s => s.prevTrack);
  const setVolume = usePlayerStore(s => s.setVolume);
  const seek = usePlayerStore(s => s.seek);
  const setCurrentTime = usePlayerStore(s => s.setCurrentTime);
  const setDuration = usePlayerStore(s => s.setDuration);
  const playTrack = usePlayerStore(s => s.playTrack);
  const currentTrack = playlist[currentTrackIndex];
  useEffect(() => {
    if (audioRef.current) {
      setAudioRef(audioRef.current);
    }
  }, [setAudioRef]);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => nextTrack();
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex, nextTrack, setCurrentTime, setDuration]);
  return (
    <div className="min-h-screen bg-black text-neon-cyan font-pixel flex items-center justify-center p-4">
      <audio ref={audioRef} src={currentTrack.audioSrc} crossOrigin="anonymous" />
      <Card className="w-full max-w-4xl bg-black/50 border-2 border-neon-magenta shadow-[0_0_20px_theme(colors.neon-magenta)] rounded-sm backdrop-blur-sm">
        <CardHeader className="text-center border-b-2 border-neon-magenta/50 pb-4">
          <CardTitle className="text-4xl font-pixel text-neon-yellow animate-neon-glow tracking-widest">
            PixelPulse
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={currentTrack.imageSrc}
                  alt="Album Art"
                  className="w-24 h-24 rounded-sm border-2 border-neon-cyan shadow-[0_0_15px_theme(colors.neon-cyan)] object-cover"
                  style={{ imageRendering: 'pixelated' }}
                />
                <div>
                  <h2 className="text-3xl text-neon-yellow">{currentTrack.title}</h2>
                  <p className="text-lg text-neon-cyan/80">{currentTrack.artist}</p>
                </div>
              </div>
              <div className="h-36 bg-black/50 border border-neon-cyan/50 rounded-sm p-2">
                <AudioVisualizer />
              </div>
              <div className="space-y-2">
                <Slider
                  value={[currentTime]}
                  max={duration || 1}
                  step={1}
                  onValueChange={(value) => seek(value[0])}
                  className="[&>span:first-child]:h-1 [&>span:first-child>span]:bg-neon-magenta [&>span:last-child]:bg-neon-cyan [&>span:last-child]:border-neon-yellow [&>span:last-child]:shadow-[0_0_10px_theme(colors.neon-yellow)]"
                />
                <div className="flex justify-between text-sm text-neon-cyan/80">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 w-32">
                  <Button variant="ghost" size="icon" className="text-neon-cyan hover:text-neon-yellow hover:bg-transparent">
                    <VolumeIcon volume={volume} />
                  </Button>
                  <Slider
                    value={[volume]}
                    max={1}
                    step={0.01}
                    onValueChange={(value) => setVolume(value[0])}
                    className="w-24 [&>span:first-child]:h-1 [&>span:first-child>span]:bg-neon-cyan [&>span:last-child]:bg-neon-yellow [&>span:last-child]:border-neon-cyan [&>span:last-child]:shadow-[0_0_10px_theme(colors.neon-cyan)]"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Button onClick={prevTrack} variant="ghost" size="icon" className="text-neon-cyan hover:text-neon-yellow hover:bg-transparent transition-colors active:scale-90">
                    <SkipBack className="h-8 w-8" />
                  </Button>
                  <Button
                    onClick={togglePlay}
                    variant="outline"
                    size="icon"
                    className="h-16 w-16 rounded-full border-2 border-neon-magenta text-neon-magenta bg-transparent hover:bg-neon-magenta/20 hover:text-neon-yellow shadow-[0_0_15px_theme(colors.neon-magenta)] transition-all active:scale-90"
                  >
                    {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                  </Button>
                  <Button onClick={nextTrack} variant="ghost" size="icon" className="text-neon-cyan hover:text-neon-yellow hover:bg-transparent transition-colors active:scale-90">
                    <SkipForward className="h-8 w-8" />
                  </Button>
                </div>
                <div className="w-32" />
              </div>
            </div>
            <div className="w-full md:w-64">
              <h3 className="text-lg text-neon-yellow border-b-2 border-neon-magenta/50 mb-2 pb-1">Playlist</h3>
              <ScrollArea className="h-80 border border-neon-cyan/50 rounded-sm p-2 bg-black/50">
                <div className="space-y-1">
                  {playlist.map((track, index) => (
                    <button
                      key={index}
                      onClick={() => playTrack(index)}
                      className={cn(
                        "w-full text-left p-2 rounded-sm transition-colors text-sm",
                        index === currentTrackIndex
                          ? "bg-neon-magenta/30 text-neon-yellow animate-text-glitch"
                          : "text-neon-cyan/80 hover:bg-neon-cyan/20"
                      )}
                    >
                      <p className="font-bold truncate">{track.title}</p>
                      <p className="text-xs truncate">{track.artist}</p>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import React, { useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume1, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans flex items-center justify-center p-4">
      <audio ref={audioRef} src={currentTrack.audioSrc} crossOrigin="anonymous" />
      <Card className="w-full max-w-4xl bg-white dark:bg-brand-earth border border-gray-200 dark:border-brand-orange/50 shadow-2xl rounded-lg overflow-hidden">
        <CardHeader className="text-center border-b border-gray-200 dark:border-brand-orange/30 p-4 bg-gray-50 dark:bg-brand-earth/50">
          <CardTitle className="text-4xl font-display text-brand-orange tracking-wider">
            PixelPulse
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <motion.div
                key={currentTrack.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.75 }}
                className="flex items-center gap-4"
              >
                <img
                  src={currentTrack.imageSrc}
                  alt="Album Art"
                  className="w-24 h-24 rounded-md shadow-lg object-cover"
                />
                <div>
                  <h2 className="text-3xl font-bold text-brand-orange">{currentTrack.title}</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">{currentTrack.artist}</p>
                </div>
              </motion.div>
              <div className="h-36 bg-gray-100 dark:bg-black/50 border border-gray-200 dark:border-brand-blue/30 rounded-lg p-2">
                <AudioVisualizer />
              </div>
              <div className="space-y-2">
                <Slider
                  value={[currentTime]}
                  max={duration || 1}
                  step={1}
                  onValueChange={(value) => seek(value[0])}
                  className="[&>span:first-child>span]:bg-brand-orange [&>span:last-child]:bg-brand-blue [&>span:last-child]:border-brand-orange"
                />
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 w-32 text-gray-600 dark:text-gray-300">
                  <Button variant="ghost" size="icon" className="hover:text-brand-blue">
                    <VolumeIcon volume={volume} />
                  </Button>
                  <Slider
                    value={[volume]}
                    max={1}
                    step={0.01}
                    onValueChange={(value) => setVolume(value[0])}
                    className="w-24 [&>span:first-child>span]:bg-brand-blue [&>span:last-child]:bg-brand-orange [&>span:last-child]:border-brand-blue"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Button onClick={prevTrack} variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300 hover:text-brand-orange dark:hover:text-brand-orange transition-colors active:scale-90">
                    <SkipBack className="h-8 w-8" />
                  </Button>
                  <Button
                    onClick={togglePlay}
                    variant="outline"
                    size="icon"
                    className="h-16 w-16 rounded-full border-2 border-brand-orange text-brand-orange bg-transparent hover:bg-brand-orange hover:text-white dark:hover:text-brand-earth shadow-lg transition-all active:scale-90"
                  >
                    {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                  </Button>
                  <Button onClick={nextTrack} variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300 hover:text-brand-orange dark:hover:text-brand-orange transition-colors active:scale-90">
                    <SkipForward className="h-8 w-8" />
                  </Button>
                </div>
                <div className="w-32" />
              </div>
            </div>
            <div className="w-full md:w-64">
              <h3 className="text-lg font-bold text-brand-blue border-b-2 border-brand-orange/50 mb-2 pb-1">Playlist</h3>
              <ScrollArea className="h-80 border border-gray-200 dark:border-brand-blue/30 rounded-lg p-2 bg-gray-50 dark:bg-black/20">
                <div className="space-y-1">
                  {playlist.map((track, index) => (
                    <button
                      key={index}
                      onClick={() => playTrack(index)}
                      className={cn(
                        "w-full text-left p-2 rounded-md transition-colors text-sm",
                        index === currentTrackIndex
                          ? "bg-brand-orange/20 text-brand-orange"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-brand-blue/20"
                      )}
                    >
                      <p className="font-bold truncate">{track.title}</p>
                      <p className="text-xs truncate text-gray-500 dark:text-gray-400">{track.artist}</p>
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
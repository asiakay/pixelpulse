export interface Track {
  title: string;
  artist: string;
  audioSrc: string;
  imageSrc: string;
}
export const playlist: Track[] = [
  {
    title: "Cyber-Grid",
    artist: "Synthwave Kid",
    audioSrc: "https://cdn.jsdelivr.net/gh/mahtoid/ct-frontend-test-data@5219137/cyber-grid.mp3",
    imageSrc: "https://cdn.jsdelivr.net/gh/mahtoid/ct-frontend-test-data@5219137/cyber-grid.png",
  },
  {
    title: "Night-Drive",
    artist: "Retro Runner",
    audioSrc: "https://cdn.jsdelivr.net/gh/mahtoid/ct-frontend-test-data@5219137/night-drive.mp3",
    imageSrc: "https://cdn.jsdelivr.net/gh/mahtoid/ct-frontend-test-data@5219137/night-drive.png",
  },
  {
    title: "Pixel-Dream",
    artist: "8-Bit Explorer",
    audioSrc: "https://cdn.jsdelivr.net/gh/mahtoid/ct-frontend-test-data@5219137/pixel-dream.mp3",
    imageSrc: "https://cdn.jsdelivr.net/gh/mahtoid/ct-frontend-test-data@5219137/pixel-dream.png",
  },
  {
    title: "Arcade-Fire",
    artist: "Chip Tune Hero",
    audioSrc: "https://cdn.jsdelivr.net/gh/mahtoid/ct-frontend-test-data@5219137/arcade-fire.mp3",
    imageSrc: "https://cdn.jsdelivr.net/gh/mahtoid/ct-frontend-test-data@5219137/arcade-fire.png",
  },
];
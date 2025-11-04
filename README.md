# PixelPulse
[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/asiakay/pixelpulse)
PixelPulse is a visually striking, modern music player web application with a vibrant 'afro-Present' aesthetic. It combines earthy tones with energetic highlights to create a unique and immersive listening experience. The application's core is a single-view interface featuring a playlist, standard playback controls, and a dynamic, canvas-based audio visualizer that reacts to the music in real-time.
## �� Key Features
*   **Vibrant Afro-Present Theme:** A beautiful, modern interface inspired by afro-present aesthetics, combining earthy background tones with vibrant, energetic accent colors.
*   **Dynamic Audio Visualizer:** A real-time, canvas-based visualizer that animates in sync with the currently playing audio.
*   **Full Playback Control:** Standard music player controls including play/pause, next/previous track, a seekable progress bar, and volume adjustment.
*   **Interactive Playlist:** A scrollable list of tracks where users can easily select and play any song.
*   **Immersive Single-Page Experience:** The entire user interface is designed as a single, cohesive component for a focused user experience.
*   **Modern & Performant:** Built with a modern tech stack for a fast, responsive, and smooth experience.
## 🎵 Adding Your Own Music
Customizing the playlist is simple. All the track information is stored in a single file.
1.  Open the project in your code editor.
2.  Navigate to the file: `src/lib/playlist.ts`.
3.  You will see an array of `Track` objects. You can add, remove, or modify the objects in this array to change the playlist.
Each track object has the following structure:
```typescript
{
  title: "Your Song Title",
  artist: "Artist Name",
  audioSrc: "URL to your audio file (e.g., .mp3)",
  imageSrc: "URL to your album art (e.g., .png, .jpg)",
}
```
**Important:** Ensure that your audio and image files are hosted somewhere accessible via a public URL and have the correct CORS (Cross-Origin Resource Sharing) headers to allow them to be loaded by the application.
## 🚀 Technology Stack
*   **Framework:** React (with Vite)
*   **Backend/Edge:** Hono on Cloudflare Workers
*   **Styling:** Tailwind CSS
*   **UI Components:** shadcn/ui
*   **State Management:** Zustand
*   **Icons:** Lucide React
*   **Animation:** Framer Motion
## 🏁 Getting Started
Follow these instructions to get a local copy of the project up and running for development and testing purposes.
### Prerequisites
Make sure you have [Bun](https://bun.sh/) installed on your machine.
### Installation
1.  Clone the repository to your local machine:
    ```sh
    git clone <repository-url>
    ```
2.  Navigate into the project directory:
    ```sh
    cd pixelpulse_music_player
    ```
3.  Install the dependencies using Bun:
    ```sh
    bun install
    ```
## 💻 Development
To start the local development server, run the following command:
```sh
bun run dev
```
This will start the Vite development server, and you can view the application by navigating to `http://localhost:3000` in your web browser. The server supports hot-reloading, so any changes you make to the source code will be reflected instantly.
## 📦 Building for Production
To create a production-ready build of the application, run:
```sh
bun run build
```
This command bundles the application and outputs the static assets to the `dist` directory, ready for deployment.
## ☁️ Deployment
This project is configured for seamless deployment to Cloudflare Pages.
To deploy the application, run the following command:
```sh
bun run deploy
```
This will trigger the `wrangler deploy` command, which builds and deploys your application to the Cloudflare network. You may need to authenticate with your Cloudflare account if this is your first time using Wrangler.
Alternatively, you can deploy directly from your GitHub repository with a single click.
[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/asiakay/pixelpulse)
# PixelPulse

[cloudflarebutton]

PixelPulse is a visually striking, retro-themed music player web application. It aims to evoke the nostalgic feel of 90s and early 2000s media players like Winamp, but built with modern, performant web technologies. The application's core is a single-view interface featuring a playlist, standard playback controls, and a dynamic, canvas-based audio visualizer that reacts to the music in real-time.

## ✨ Key Features

*   **Retro-Themed UI:** A nostalgic interface inspired by classic desktop media players, featuring pixelated fonts and neon glow effects.
*   **Dynamic Audio Visualizer:** A real-time, canvas-based visualizer that animates in sync with the currently playing audio.
*   **Full Playback Control:** Standard music player controls including play/pause, next/previous track, a seekable progress bar, and volume adjustment.
*   **Interactive Playlist:** A scrollable list of tracks where users can easily select and play any song.
*   **Immersive Single-Page Experience:** The entire user interface is designed as a single, cohesive component for a focused user experience.
*   **Modern & Performant:** Built with a modern tech stack for a fast, responsive, and smooth experience.

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

[cloudflarebutton]
import { createSignal, onMount, onCleanup, createEffect } from "solid-js";

export interface YouTubePlayerOptions {
  videoId: string;
  autoplay?: boolean;
  controls?: boolean;
  modestbranding?: boolean;
  rel?: boolean;
  showinfo?: boolean;
  onStateChange?: (state: number) => void;
}

export interface YouTubePlayerHandle {
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  loadVideoById: (videoId: string) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  isReady: () => boolean;
  registerStateChangeHandler: (handler: (state: number) => void) => void;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: any;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
  }
}

export function useYoutubePlayer(containerId: string): YouTubePlayerHandle {
  let playerInstance: any = null;
  let iframeApiLoaded = false;
  let stateChangeHandlers: ((state: number) => void)[] = [];
  let apiReadyResolve: (() => void) | null = null;

  const [isReady, setIsReady] = createSignal(false);

  const loadYouTubeAPI = () => {
    return new Promise<void>((resolve) => {
      if (window.YT?.Player) {
        iframeApiLoaded = true;
        resolve();
        return;
      }

      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";

        window.onYouTubeIframeAPIReady = () => {
          iframeApiLoaded = true;
          resolve();
        };

        document.head.appendChild(tag);
      } else {
        const maxAttempts = 50;
        let attempts = 0;
        const checkAPI = setInterval(() => {
          attempts++;
          if (window.YT?.Player) {
            clearInterval(checkAPI);
            iframeApiLoaded = true;
            resolve();
          } else if (attempts >= maxAttempts) {
            clearInterval(checkAPI);
            console.warn(
              "[useYoutubePlayer] Failed to load YouTube API after 5 seconds",
            );
            resolve();
          }
        }, 100);
      }
    });
  };

  const initializePlayer = async (options: YouTubePlayerOptions) => {
    if (!iframeApiLoaded || !window.YT?.Player) {
      await loadYouTubeAPI();
    }

    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`[useYoutubePlayer] Container not found: ${containerId}`);
      return;
    }

    if (!window.YT?.Player) {
      console.error("[useYoutubePlayer] YouTube API Player not loaded");
      return;
    }

    try {
      playerInstance = new window.YT.Player(containerId, {
        videoId: options.videoId,
        width: "1",
        height: "1",
        playerVars: {
          autoplay: options.autoplay ? 1 : 0,
          controls: options.controls ? 1 : 0,
          modestbranding: options.modestbranding ? 1 : 0,
          rel: options.rel ? 1 : 0,
          showinfo: options.showinfo ? 1 : 0,
          fs: 0,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            setIsReady(true);
          },
          onError: (event: any) => {
            console.error("[useYoutubePlayer] Player error:", event.data);
          },
          onStateChange: (event: any) => {
            const state = event.data;
            stateChangeHandlers.forEach((handler) => handler(state));
          },
        },
      });
    } catch (error) {
      console.error("[useYoutubePlayer] Failed to initialize player:", error);
    }
  };

  onMount(async () => {
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.width = "1px";
      container.style.height = "1px";
      document.body.appendChild(container);
    }

    await loadYouTubeAPI();

    await initializePlayer({
      videoId: "dQw4w9WgXcQ",
      autoplay: false,
    });
  });

  onCleanup(() => {
    if (playerInstance) {
      playerInstance.destroy();
      playerInstance = null;
    }
  });

  return {
    play: () => {
      if (playerInstance && isReady()) {
        playerInstance.playVideo();
      }
    },

    pause: () => {
      if (playerInstance && isReady()) {
        playerInstance.pauseVideo();
      }
    },

    setVolume: (volume: number) => {
      if (playerInstance && isReady()) {
        playerInstance.setVolume(Math.max(0, Math.min(100, volume)));
      }
    },

    loadVideoById: (videoId: string) => {
      if (playerInstance && isReady() && videoId) {
        playerInstance.loadVideoById(videoId);
      }
    },

    getCurrentTime: () => {
      if (playerInstance && isReady()) {
        return playerInstance.getCurrentTime();
      }
      return 0;
    },

    getDuration: () => {
      if (playerInstance && isReady()) {
        return playerInstance.getDuration();
      }
      return 0;
    },

    isReady: () => isReady(),

    registerStateChangeHandler: (handler: (state: number) => void) => {
      stateChangeHandlers.push(handler);
    },
  };
}

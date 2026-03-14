import { createSignal } from "solid-js";
import { render } from "solid-js/web";

export default function PlayerApp(container: HTMLElement) {
  const [playing, setPlaying] = createSignal(false);
  const [currentTrack, setCurrentTrack] = createSignal("No track playing");
  const [volume, setVolume] = createSignal(70);

  const togglePlayPause = () => setPlaying(!playing());

  const PlayerContent = () => (
    <div style={styles.player}>
      <div style={styles.trackInfo}>
        m<div style={styles.trackTitle}>🎵 {currentTrack()}</div>
        <div style={styles.trackArtist}>Now Playing</div>
      </div>

      <div style={styles.controls}>
        <button style={styles.controlButton} title="Previous">
          ⏮️
        </button>
        <button
          style={{ ...styles.controlButton, ...styles.playButton }}
          onClick={togglePlayPause}
          title={playing() ? "Pause" : "Play"}
        >
          {playing() ? "⏸️" : "▶️"}
        </button>
        <button style={styles.controlButton} title="Next">
          ⏭️
        </button>
      </div>

      <div style={styles.volumeControl}>
        <span style={styles.volumeLabel}>🔊</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume()}
          onInput={(e) => setVolume(Number(e.currentTarget.value))}
          style={styles.volumeSlider}
        />
        <span style={styles.volumeValue}>{volume()}%</span>
      </div>
    </div>
  );

  const dispose = render(() => <PlayerContent />, container);
  return dispose;
}

const styles = {
  player: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1a1a1a",
    borderTop: "1px solid #333",
    padding: "15px 20px",
    gap: "20px",
    color: "white",
    fontSize: "14px",
  },
  trackInfo: {
    flex: 1,
    minWidth: "200px",
  },
  trackTitle: {
    fontWeight: "bold",
    color: "#1ed760",
    marginBottom: "4px",
  },
  trackArtist: {
    fontSize: "12px",
    color: "#b3b3b3",
  },
  controls: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  controlButton: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
    padding: "5px 10px",
    transition: "transform 0.2s",
  },
  playButton: {
    fontSize: "24px",
    backgroundColor: "#1db954",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  volumeControl: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minWidth: "150px",
  },
  volumeLabel: {
    fontSize: "16px",
  },
  volumeSlider: {
    width: "80px",
    cursor: "pointer",
  },
  volumeValue: {
    fontSize: "12px",
    color: "#b3b3b3",
    minWidth: "30px",
  },
};

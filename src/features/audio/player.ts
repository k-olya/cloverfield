import { PLAYLIST } from "../../config/playlist";

class AudioPlayer {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private source: AudioBufferSourceNode | null = null;
  private currentTrackIndex = 0;
  private isMuted = false;
  private volume = 1;
  private isInitialized = false;
  private isPlaying = false;
  private bufferCache: (AudioBuffer | null)[] = Array(PLAYLIST.length).fill(null);
  private promises: Map<string, Promise<AudioBuffer | null>> = new Map();

  constructor() {
    // No-op: lazy init
  }

  async init() {
    if (this.isInitialized) return;
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
    this.setVolume(this.volume);
    this.isInitialized = true;
  }

  async play() {
    if (!this.isInitialized) await this.init();
    if (this.isPlaying) return;
    await this.playTrack(this.currentTrackIndex);
    this.isPlaying = true;
  }

  async playTrack(index: number) {
    if (!this.audioContext || !this.gainNode) return;
    this.stop();
    this.currentTrackIndex = index;
    let buffer = this.bufferCache[index];
    if (!buffer) {
      buffer = await this.loadTrack(PLAYLIST[index]);
      this.bufferCache[index] = buffer;
    }
    if (!buffer) return;
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = buffer;
    this.source.connect(this.gainNode);
    this.source.onended = () => {
      this.next();
    };
    this.source.start(0);
    // preload the next track
    this.loadTrack(PLAYLIST[(index + 1) % PLAYLIST.length]);
  }

  // load a track and cache the promise
  async loadTrack(filename: string): Promise<AudioBuffer | null> {
    if (this.promises.has(filename)) {
      return await this.promises.get(filename) ?? null;
    }
    const promise = this._loadTrack(filename);
    this.promises.set(filename, promise);
    return promise;
  }

  // load a track and return the buffer
  async _loadTrack(filename: string): Promise<AudioBuffer | null> {
    if (!this.audioContext) return null;
    try {
      const response = await fetch(`audio/${filename}`);
      const arrayBuffer = await response.arrayBuffer();
      return await this.audioContext.decodeAudioData(arrayBuffer);
    } catch (e) {
      console.error("Failed to load track", filename, e);
      return null;
    }
  }

  pause() {
    if (this.audioContext && this.audioContext.state === "running") {
      this.audioContext.suspend();
      this.isPlaying = false;
    }
  }

  resume() {
    if (this.audioContext && this.audioContext.state === "suspended") {
      this.audioContext.resume();
      this.isPlaying = true;
    }
  }

  stop() {
    if (this.source) {
      this.source.onended = null;
      try { this.source.stop(); } catch {}
      this.source.disconnect();
      this.source = null;
    }
  }

  next() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % PLAYLIST.length;
    this.playTrack(this.currentTrackIndex);
  }

  prev() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    this.playTrack(this.currentTrackIndex);
  }

  setVolume(vol: number) {
    this.volume = vol;
    if (this.gainNode) {
      this.gainNode.gain.value = this.isMuted ? 0 : vol;
    }
  }

  mute() {
    this.isMuted = true;
    if (this.gainNode) this.gainNode.gain.value = 0;
    this.pause();
  }

  unmute() {
    this.isMuted = false;
    if (this.gainNode) this.gainNode.gain.value = this.volume;
    this.resume();
  }

  getVolume() {
    return this.volume;
  }

  getMuted() {
    return this.isMuted;
  }

  getPlaying() {
    return this.isPlaying;
  }
}

export const audioPlayer = new AudioPlayer(); 
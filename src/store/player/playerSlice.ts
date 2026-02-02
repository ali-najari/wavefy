import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Source =
  | { type: "playlist"; id: string }
  | { type: "artist"; id: string }
  | { type: "single"; id: string }
  | { type: "search"; query: string };

export interface PlayerState {
  currentSongId: string | null;
  queue: string[];
  currentIndex: number;
  isPlaying: boolean;

  currentTime: number;
  duration: number;
  volume: number;

  source?: Source | null;

  shuffle: boolean;
  repeat: "off" | "one" | "all";
}

export const initialState: PlayerState = {
  currentSongId: null,
  queue: [],
  currentIndex: 0,
  isPlaying: false,

  currentTime: 0,
  duration: 0,
  volume: 1,

  source: null,
  shuffle: false,
  repeat: "off",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    play: (
      state,
      action: PayloadAction<{
        songId?: string;
        queue?: string[];
        index?: number;
        source?: Source | null;
      }>
    ) => {
      if (
        action.payload?.songId !== undefined &&
        action.payload.songId !== state.currentSongId
      ) {
        state.currentSongId = action.payload.songId;
        state.currentTime = 0;
      }

      state.isPlaying = true;

      if (action.payload?.queue) state.queue = action.payload.queue;
      if (action.payload?.index !== undefined)
        state.currentIndex = action.payload.index;
      if (action.payload?.source !== undefined)
        state.source = action.payload.source;
    },

    pause: (state) => {
      state.isPlaying = false;
    },

    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },

    seek: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },

    setTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },

    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },

    setQueue: (
      state,
      action: PayloadAction<{
        queue: string[];
        index?: number;
        source?: Source | null;
      }>
    ) => {
      state.queue = action.payload.queue;
      state.currentIndex = action.payload.index ?? 0;
      if (action.payload.source !== undefined)
        state.source = action.payload.source;
    },

    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },

    cycleRepeat: (state) => {
      state.repeat =
        state.repeat === "off" ? "all" : state.repeat === "all" ? "one" : "off";
    },

    next: (state) => {
      if (!state.queue.length) return;

      if (state.shuffle) {
        const randomIndex = Math.floor(Math.random() * state.queue.length);
        state.currentIndex = randomIndex;
        state.currentSongId = state.queue[randomIndex];
      } else {
        if (state.currentIndex < state.queue.length - 1) {
          state.currentIndex += 1;
          state.currentSongId = state.queue[state.currentIndex];
        } else if (state.repeat === "all") {
          state.currentIndex = 0;
          state.currentSongId = state.queue[0];
        } else {
          state.isPlaying = false;
        }
      }
    },

    prev: (state) => {
      if (!state.queue.length) return;

      if (state.shuffle) {
        const randomIndex = Math.floor(Math.random() * state.queue.length);
        state.currentIndex = randomIndex;
        state.currentSongId = state.queue[randomIndex];
      } else {
        if (state.currentIndex > 0) {
          state.currentIndex -= 1;
          state.currentSongId = state.queue[state.currentIndex];
        } else if (state.repeat === "all") {
          state.currentIndex = state.queue.length - 1;
          state.currentSongId = state.queue[state.currentIndex];
        } else {
          state.isPlaying = false;
        }
      }
    },

    songEnded: (state) => {
      if (!state.queue.length) return;

      if (state.repeat === "one") {
        state.currentTime = 0;
        state.currentSongId = state.queue[state.currentIndex];
        state.isPlaying = true;
      } else if (state.shuffle) {
        const randomIndex = Math.floor(Math.random() * state.queue.length);
        state.currentIndex = randomIndex;
        state.currentSongId = state.queue[randomIndex];
        state.isPlaying = true;
      } else {
        if (state.currentIndex < state.queue.length - 1) {
          state.currentIndex += 1;
          state.currentSongId = state.queue[state.currentIndex];
          state.isPlaying = true;
        } else if (state.repeat === "all") {
          state.currentIndex = 0;
          state.currentSongId = state.queue[0];
          state.isPlaying = true;
        } else {
          state.isPlaying = false;
        }
      }
    },
  },
});

export const playerActions = playerSlice.actions;
export default playerSlice.reducer;

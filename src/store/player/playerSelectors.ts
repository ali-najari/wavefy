import { RootState } from "../index";

export const selectPlayer = (state: RootState) => state.player;
export const selectIsPlaying = (state: RootState) => state.player.isPlaying;
export const selectCurrentSongId = (state: RootState) =>
  state.player.currentSongId;

// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "@/store/player/playerSlice";

const store = configureStore({
  reducer: {
    player: playerReducer, // ⬅️ خیلی مهم
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

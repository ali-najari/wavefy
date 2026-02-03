"use client";

import Image from "next/image";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { playerActions } from "@/store/player/playerSlice";
import playlistsData from "@/data/playlists.json";
import type { Source } from "@/store/player/playerSlice";

type PlaylistHeaderProps = {
  playlistId: string;
  name: string;
  imageUrl: string;
  description: string;
};

const PlaylistHeader = ({ playlistId, name, imageUrl, description }: PlaylistHeaderProps) => {
  const dispatch = useDispatch();

  const handlePlay = () => {
    // 1) پیدا کردن پلی‌لیست
    const playlist = playlistsData.playlists.find(p => p.id === playlistId);
    if (!playlist) return;

    const songIds = playlist.songs; // ["song_004","song_005",...]

    const source: Source = { type: "playlist", id: playlistId };

    // 2) ست کردن Queue
    dispatch(
      playerActions.setQueue({
        queue: songIds,
        index: 0,
        source,
      })
    );

    // 3) پلی کردن آهنگ اول
    dispatch(
      playerActions.play({
        songId: songIds[0],
        queue: songIds,
        index: 0,
        source,
      })
    );
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.imageWrapper}>
        <Image src={imageUrl} alt={name} fill className={styles.cover} />
      </div>

      <div className={styles.info}>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.genre}>{description}</p>

        <div className={styles.controls}>
          <button className={styles.playBtn} onClick={handlePlay}>
            Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;

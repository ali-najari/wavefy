"use client";

import Image from "next/image";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import songData from "@/data/songs.json";

const SongInfo = () => {
  const currentSongId = useSelector((state: RootState) => state.player.currentSongId);

  const currentSong = songData.songs.find(s => s.id === currentSongId);

  if (!currentSong) return null;

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.leftSide}>
        <div className={styles.cover}>
          <Image
            src={currentSong.coverUrl}
            alt={currentSong.title}
            width={50}
            height={50}
            style={{ objectFit: "cover", borderRadius: "4px", userSelect:"none" }}
          />
        </div>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.songName}>{currentSong.title}</div>
        <div className={styles.artistName}>{currentSong.artist_name}</div>
      </div>
    </div>
  );
};

export default SongInfo;

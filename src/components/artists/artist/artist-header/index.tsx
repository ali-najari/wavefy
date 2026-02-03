"use client";

import Image from "next/image";
import styles from "./styles.module.scss";
import songData from "@/data/songs.json";
import { useDispatch } from "react-redux";
import { playerActions } from "@/store/player/playerSlice";
import type { Source } from "@/store/player/playerSlice";

type ArtistHeaderProps = {
  name: string;
  imageUrl: string;
  followers: number;
  genre: string;
};

const ArtistHeader = ({
  name,
  imageUrl,
  followers,
  genre,
}: ArtistHeaderProps) => {
  const dispatch = useDispatch();
  const songs = songData.songs;

  const handlePlay = () => {
    const artistSongs = songs.filter(
      song => song.artist_name === name
    );

    if (!artistSongs.length) return;

    const queue = artistSongs.map(s => s.id);

    const source: Source = {
      type: "artist",
      id: name,
    };

    dispatch(
      playerActions.play({
        songId: queue[0],
        queue,
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
        <p className={styles.genre}>{genre}</p>

        <p className={styles.followers}>
          {followers.toLocaleString()} followers
        </p>

        <div className={styles.controls}>
          <button className={styles.playBtn} onClick={handlePlay}>
            Play
          </button>
          <button className={styles.followBtn}>Follow</button>
        </div>
      </div>
    </div>
  );
};

export default ArtistHeader;

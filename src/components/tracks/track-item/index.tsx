"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
import PlayIcon from "../../../../public/image/tracks-item/play.png";
import { useDispatch } from "react-redux";
import { playerActions } from "@/store/player/playerSlice";
import type { Source } from "@/store/player/playerSlice";

type TrackItemProps = {
  id: string;
  cover: string;
  title: string;
  subtitle: string;
  queue?: string[];
  index?: number;
  artistId: string;
  sourceId?: string; // 👈 برای reuse
};

const TrackItem = ({
  id,
  cover,
  title,
  subtitle,
  queue,
  index,
  artistId,
  sourceId = "tracks",
}: TrackItemProps) => {
  const dispatch = useDispatch();

  const handlePlay = () => {
    const source: Source = {
      type: queue ? "playlist" : "single",
      id: sourceId,
    };

    dispatch(
      playerActions.play({
        songId: id,
        queue: queue ?? [id],
        index: typeof index === "number" ? index : 0,
        source,
      })
    );
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.imageWrapper}>
        <Image
          src={cover}
          alt={title}
          fill
          className={styles.cover}
          sizes="(max-width: 600px) 150px, 200px"
        />
      </div>

      <button
        className={styles.playBtn}
        onClick={handlePlay}
        aria-label={`Play ${title}`}
      >
        <Image alt="playIcon" src={PlayIcon} className={styles.playIcon} />
      </button>

      <div className={styles.textWrapper}>
        <h3 className={styles.title}>{title}</h3>
        <Link href={`/artists/${artistId}`} className={styles.subtitle}>
          {subtitle}
        </Link>
      </div>
    </div>
  );
};

export default TrackItem;

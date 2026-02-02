"use client";

import Image from "next/image";
import styles from "./styles.module.scss";
import Link from "next/link";

type PlaylistItemProps = {
  id: string;
  name: string;
  imageUrl: string;
};

const PlaylistItem = ({ id ,name, imageUrl }: PlaylistItemProps) => {
  return (
    <Link href={`/playlists/${id}`} className={styles.mainWrapper}>
      <div className={styles.imageWrapper}>
        <Image src={imageUrl} alt={name} fill className={styles.cover} />
      </div>

      <p className={styles.name}>{name}</p>
    </Link>
  );
};

export default PlaylistItem;

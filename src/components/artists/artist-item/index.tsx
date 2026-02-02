"use client";

import Image from "next/image";
import styles from "./styles.module.scss";
import Link from "next/link";

type ArtistItemProps = {
  id: string;
  name: string;
  imageUrl: string;
};

const ArtistItem = ({ id, name, imageUrl }: ArtistItemProps) => {
  return (
    <Link href={`/artists/${id}`} className={styles.mainWrapper}>
      <div className={styles.imageWrapper}>
        <Image src={imageUrl} alt={name} fill className={styles.cover} />
      </div>

      <p className={styles.name}>{name}</p>
    </Link>
  );
};

export default ArtistItem;

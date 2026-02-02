"use client";

import styles from "./styles.module.scss";
import TrackItem from "@/components/tracks/track-item"; 

type Track = {
  id: string;
  title: string;
  coverUrl: string;
  audioUrl: string;
  artistName?: string;
  artistId:string;
};

const ArtistTracks = ({ tracks }: { tracks: Track[] }) => {
  const queue = tracks.map(t => t.id); 

  return (
    <div className={styles.mainWrapper}>
      <h2 className={styles.title}>Popular Tracks</h2>

      <div className={styles.list}>
        {tracks.map((track, index) => (
          <TrackItem
            key={track.id}
            id={track.id}
            cover={track.coverUrl}
            title={track.title}
            subtitle={track.artistName ?? ""}
            artistId={track.artistId}
            queue={queue}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtistTracks;

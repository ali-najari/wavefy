import TrackItem from "@/components/tracks/track-item/index";
import styles from "./styles.module.scss";
import songs from "@/data/songs.json";

export default function TracksPage() {

  const sortedSongs = [...songs.songs].sort((a, b) => {
    return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
  });

  const queue = sortedSongs.map((t) => t.id);

  return (
    <div className={styles.mainWrapper}>
      <h1 className={styles.title}>Tracks</h1>

      <div className={styles.grid}>
        {sortedSongs.map((song, index) => (
          <TrackItem
            key={song.id}
            artistId={song.artistId}
            id={song.id}
            cover={song.coverUrl}
            title={song.title}
            subtitle={song.artist_name}
            queue={queue}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

import styles from "./styles.module.scss"
import TrackItem from "@/components/tracks/track-item";
import songs from "@/data/songs.json";

const HomeTrackRow = ({ type }: { type: "new" | "top" }) => {
  const tracks = [...songs.songs]
    .sort((a, b) =>
      type === "new"
        ? Date.parse(b.releaseDate) - Date.parse(a.releaseDate)
        : 0
    )
    .slice(0, 7);

  const queue = tracks.map(t => t.id);

  return (
    <>
      {tracks.map((track, index) => (
        <div key={track.id} className={styles.cardWrapper}>
          <TrackItem
            id={track.id}
            cover={track.coverUrl}
            title={track.title}
            subtitle={track.artist_name}
            artistId={track.artistId}
            queue={queue}
            index={index}
          />
        </div>
      ))}
    </>
  );
};

export default HomeTrackRow;


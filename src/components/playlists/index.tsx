import PlaylistData from "@/data/playlists.json";
import styles from "./styles.module.scss";
import PlaylistItem from "./playlist-item";

const Playlists = () => {
  return (
    <div className={styles.mainWrapper}>
      <h2 className={styles.title}>Artist Playlists</h2>

      <div className={styles.grid}>
        {PlaylistData.playlists.map(playlist => (
          <PlaylistItem
            key={playlist.id}
            id={playlist.id}
            name={playlist.name}
            imageUrl={playlist.coverUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlists;

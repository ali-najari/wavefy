import PlaylistData from "@/data/playlists.json";
import styles from "./styles.module.scss";
import PlaylistItem from "@/components/playlists/playlist-item";

const ArtistPlaylists = ({ artistId }: { artistId: string }) => {
  const filtered = PlaylistData.playlists.filter(
    playlist => playlist.creator === artistId
  );

  return (
    <div className={styles.mainWrapper}>
      <h2 className={styles.title}>Artist Playlists</h2>

      <div className={styles.grid}>
        {filtered.map(playlist => (
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

export default ArtistPlaylists;

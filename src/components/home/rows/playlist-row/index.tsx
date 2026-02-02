import styles from "./styles.module.scss"
import PlaylistItem from "@/components/playlists/playlist-item";
import Playlists from "@/data/playlists.json";

const HomePlatlistRow = () => {


  return (
    <>
      {Playlists.playlists.map((playlist) => (
        <div key={playlist.id} className={styles.cardWrapper} >
          <PlaylistItem
            key={playlist.id}
            id={playlist.id}
            name={playlist.name}
            imageUrl={playlist.coverUrl}
          />
        </div>
      ))}
    </>
  );
};

export default HomePlatlistRow;


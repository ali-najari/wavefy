import TrackItem from "@/components/tracks/track-item/index";
import styles from "./styles.module.scss";
import songsData from "@/data/songs.json";
import PlaylistHeader from "./playlist-header";
import PlaylistData from "@/data/playlists.json";

type PlaylistProps = {
  id: string;
};

const Playlist = ({ id }: PlaylistProps) => {

  const playlist = PlaylistData.playlists.find(p => p.id === id);

  if (!playlist) {
    return <h1>Playlist not found</h1>;
  }

  
  const tracks = songsData.songs.filter(song =>
    playlist.songs.includes(song.id)
  );

  return (
    <div className={styles.mainWrapper}>

      <PlaylistHeader
        name={playlist.name}
        imageUrl={playlist.coverUrl}
        description={playlist.description}
        playlistId={playlist.id}
      />

      <div className={styles.grid}>
        {tracks.map(song => (
          <TrackItem
            key={song.id}
            id={song.id}
            cover={song.coverUrl}
            title={song.title}
            subtitle={song.artist_name}
            artistId={song.artistId}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist;

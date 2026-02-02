import styles from "./styles.module.scss"
import { notFound } from "next/navigation";
import artistsData from "@/data/artists.json";
import songsData from "@/data/songs.json";

import ArtistHeader from "./artist-header";
import ArtistTracks from "./artist-tracks";
import ArtistPlaylists from "./artist-playlist";

const Artist = ({ id }: { id: string }) => {
  const artist = artistsData.artists.find(a => a.id === id);

  if (!artist) return notFound();

  const popularTracks = artist.topTracks
    .map(trackId => songsData.songs.find(song => song.id === trackId))
    .filter(Boolean) 
    .map(song => ({
      ...song!,
      artistName: artist.name,
    }));

  return (
    <div className={styles.mainWrapper}>
      <ArtistHeader
        name={artist.name}
        imageUrl={artist.imageUrl}
        followers={artist.followers}
        genre={artist.genre}
      />

      <ArtistTracks tracks={popularTracks} />

      <ArtistPlaylists artistId={id} />
    </div>
  );
};

export default Artist;

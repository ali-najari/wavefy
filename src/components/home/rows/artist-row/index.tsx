import styles from "./styles.module.scss"
import ArtistItem from "@/components/artists/artist-item";
import Artists from "@/data/artists.json";

const HomeArtistRow = () => {


  return (
    <>
      {Artists.artists.map((artist) => (
        <div key={artist.id} className={styles.cardWrapper}>
          <ArtistItem
            key={artist.id}
            id={artist.id}
            name={artist.name}
            imageUrl={artist.imageUrl}
          />
        </div>
      ))}
    </>
  );
};

export default HomeArtistRow;


import artistsData from "@/data/artists.json";
import ArtistItem from "./artist-item/index";
import styles from "./styles.module.scss";

const Artists = () => {
  return (
    <div className={styles.mainWrapper}>
      <h2 className={styles.title}>Artists</h2>

      <div className={styles.grid}>
        {artistsData.artists.map((artist) => (
          <ArtistItem
            key={artist.id}
            id={artist.id}
            name={artist.name}
            imageUrl={artist.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Artists;

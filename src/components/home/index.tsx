import HomeArtistRow from "./rows/artist-row";
import HomePlatlistRow from "./rows/playlist-row";
import HomeTrackRow from "./rows/track-row";
import HomeSection from "./section";
import styles from "./styles.module.scss";

const Home = () => {
  return (
    <div className={styles.mainWrapper}>
      <HomeSection url="tracks" title="New Realese">
        <HomeTrackRow type="new" />
      </HomeSection>
      <HomeSection url="playlists" title="Playlists">
        <HomePlatlistRow />
      </HomeSection>
      <HomeSection url="artists" title="Artists">
        <HomeArtistRow />
      </HomeSection>
    </div>
  );
};

export default Home;

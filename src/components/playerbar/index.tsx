import PlayerControl from "./player-control";
import PLayerOption from "./player-option";
import SongInfo from "./song-info";
import styles from "./styles.module.scss";

const PlayerBar = () => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.songInfo}>
        <SongInfo />
      </div>
      <div className={styles.playerControl}>
        <PlayerControl />
      </div>
      <div className={styles.playerOption}>
        <PLayerOption />
      </div>
    </div>
  );
};

export default PlayerBar;

import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import MixesAndRadio from "../../../public/image/sidebar/Mixes.png";
import Playlists from "../../../public/image/sidebar/playlist.png";
import Albums from "../../../public/image/sidebar/albums.png";
import Tracks from "../../../public/image/sidebar/tracks.png";
import Artists from "../../../public/image/sidebar/artists.png";

interface MyCollectionProps {
  title: string;
  icon: React.ReactNode;
  url: string;
}

const SideBar = () => {
  const MyCollections: MyCollectionProps[] = [
    // {
    //   title: "Mixes and Radio",
    //   url: "/Mixes and Radio",
    //   icon: (
    //     <Image
    //       alt="MixesAndRadio"
    //       src={MixesAndRadio}
    //       className={styles.icons}
    //       style={{ width: "24px" }}
    //     />
    //   ),
    // },
    {
      title: "Playlists",
      url: "/playlists",

      icon: <Image alt="Playlists" src={Playlists} className={styles.icons} />,
    },
    // {
    //   title: "Albums",
    //   url: "/albums",
    //   icon: <Image alt="Albums" src={Albums} className={styles.icons} />,
    // },
    {
      title: "Tracks",
      url: "/tracks",
      icon: <Image alt="Tracks" src={Tracks} className={styles.icons} />,
    },
    {
      title: "Artists",
      url: "/artists",
      icon: <Image alt="Artists" src={Artists} className={styles.icons} />,
    },
  ];

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.sidebarHeader}></div>
      <div className={styles.mainParts}>
        <Link href={"/"}>Home</Link>
        {/* <Link href={"/"}>Explore</Link> */}
        {/* <Link href={"/"}>Videos</Link> */}
      </div>
      <span className={styles.myCollectionTitle}>MY COLLECTIONS</span>
      {MyCollections.map((myCollection, index) => (
        <Link href={myCollection.url} className={styles.myCollection} key={index}>
          <div className={styles.a}>{myCollection.icon}</div>
          <div className={styles.text}>{myCollection.title}</div>
        </Link>
      ))}
      <span className={styles.myPlaylistTitle}>MY PLAYLISTS</span>
      <div className={styles.myPlaylists}>{}</div>
    </div>
  );
};

export default SideBar;

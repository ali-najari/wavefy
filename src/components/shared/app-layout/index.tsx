"use client";

import PlayerBar from "@/components/playerbar";
import SideBar from "@/components/sidebar";
import styles from "./styles.module.scss";
import { Provider } from "react-redux";
import store from "@/store";
import { usePlayerAudio } from "@/hooks/useAudio/useAudio";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  function PlayerSideEffects() {
    usePlayerAudio();
    return null;
  }

  return (
    <Provider store={store}>
      <PlayerSideEffects/>
      <div className={styles.layoutWrapper}>
        <div className={styles.topSection}>
          <aside className={styles.sidebarWrapper}>
            <SideBar />
          </aside>

          <main className={styles.contentWrapper}>{children}</main>
        </div>

        <footer className={styles.playerWrapper}>
          <PlayerBar />
        </footer>
      </div>
    </Provider>
  );
}

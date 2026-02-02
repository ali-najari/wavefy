"use client";

import Image from "next/image";
import styles from "./styles.module.scss";

import VolumeIcon from "../../../../public/image/player-bar/player-option/Icon-Volume.png";
import ChromecastIcon from "../../../../public/image/player-bar/player-option/Icon-Chromecast.png";
import QueueIcon from "../../../../public/image/player-bar/player-option/Icon-Queue.png";
import FlashIcon from "../../../../public/image/player-bar/player-option/flash.png";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "@/store/player/playerSlice";
import { RootState } from "@/store";

interface IPlayerOption {
  icon: React.ReactNode;
  onClick?: () => void;
}

const PLayerOption = () => {
  const dispatch = useDispatch();
  const state = useSelector((s: RootState) => s.player);

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const Icons: IPlayerOption[] = [
    {
      icon: (
        <div
          className={styles.icons}
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
        >
          <Image src={VolumeIcon} alt="VolumeIcon" />
          {showVolumeSlider && (
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={state.volume}
              onChange={(e) =>
                dispatch(playerActions.setVolume(Number(e.target.value)))
              }
              style={{ "--volume": state.volume } as React.CSSProperties}
              className={styles.volumeSlider}
            />
          )}
        </div>
      ),
    },
    {
      icon: (
        <Image
          src={ChromecastIcon}
          alt="ChromecastIcon"
          className={styles.icons}
        />
      ),
      onClick: () => console.log("Chromecast clicked"),
    },
    {
      icon: (
        <Image src={QueueIcon} alt="QueueIcon" className={styles.icons} />
      ),
      onClick: () => dispatch(playerActions.next()),
    },
    {
      icon: (
        <Image
          src={FlashIcon}
          alt="FlashIcon"
          style={{ width: "16px", height: "16px", padding: "13px" }}
        />
      ),
      onClick: () => {
        if (state.isPlaying) dispatch(playerActions.pause());
        else dispatch(playerActions.play({ songId: state.currentSongId ?? undefined }));
      },
    },
  ];

  return (
    <div className={styles.mainWrapper}>
      {Icons.map((iconItem, index) => (
        <div
          key={index}
          onClick={iconItem.onClick}
          style={{ cursor: iconItem.onClick ? "pointer" : "default" }}
        >
          {iconItem.icon}
        </div>
      ))}
    </div>
  );
};

export default PLayerOption;

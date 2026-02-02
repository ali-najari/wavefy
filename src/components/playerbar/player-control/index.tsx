"use client";

import Image from "next/image";
import styles from "./styles.module.scss";

import PlayIcon from "../../../../public/image/player-bar/player-control/play-icon.png";
import PauseIcon from "../../../../public/image/player-bar/player-control/pause-button.png";
import ShuffleIcon from "../../../../public/image/player-bar/player-control/shuffle-icon.png";
import NextIcon from "../../../../public/image/player-bar/player-control/next-icon.png";
import PrevIcon from "../../../../public/image/player-bar/player-control/prev-icon.png";
import RepeatIcon from "../../../../public/image/player-bar/player-control/Icon.png";
import RepeatOneIcon from "../../../../public/image/player-bar/player-control/repeat-once.png";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { playerActions } from "@/store/player/playerSlice";

type SeekBarStyle = React.CSSProperties & {
  "--seek-progress"?: string;
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const PlayerControl = () => {
  const dispatch = useDispatch();
  const state = useSelector((s: RootState) => s.player);

  const [isDragging, setIsDragging] = useState(false);
  const [tempValue, setTempValue] = useState<number | null>(null);

  // ===== play / pause =====
  const handlePlayPause = useCallback(() => {
    if (state.isPlaying) {
      dispatch(playerActions.pause());
    } else {
      dispatch(
        playerActions.play({
          songId: state.currentSongId ?? undefined,
        })
      );
    }
  }, [state.isPlaying, state.currentSongId, dispatch]);

  // ===== seek =====
  const commitSeek = () => {
    if (tempValue != null) {
      dispatch(playerActions.seek(tempValue));
    }
    setIsDragging(false);
    setTempValue(null);
  };

  // ===== progress =====
  const progressPercent = useMemo(() => {
    const current = isDragging
      ? tempValue ?? state.currentTime
      : state.currentTime;
    return state.duration
      ? (current / state.duration) * 100
      : 0;
  }, [isDragging, tempValue, state.currentTime, state.duration]);

  // ===== keyboard =====
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.code) {
        case "Space":
          e.preventDefault();
          handlePlayPause();
          break;
        case "ArrowRight":
          dispatch(
            playerActions.seek(
              Math.min(state.currentTime + 5, state.duration)
            )
          );
          break;
        case "ArrowLeft":
          dispatch(
            playerActions.seek(Math.max(state.currentTime - 5, 0))
          );
          break;
        case "ArrowUp":
          dispatch(
            playerActions.setVolume(Math.min(state.volume + 0.05, 1))
          );
          break;
        case "ArrowDown":
          dispatch(
            playerActions.setVolume(Math.max(state.volume - 0.05, 0))
          );
          break;
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [dispatch, handlePlayPause, state]);

  // ===== controls =====
  const controls = [
    {
      icon: (
        <Image
          src={ShuffleIcon}
          alt="Shuffle"
          className={`${styles.icons2} ${
            state.shuffle ? styles.active : ""
          }`}
        />
      ),
      onClick: () => dispatch(playerActions.toggleShuffle()),
    },
    {
      icon: <Image src={PrevIcon} alt="Prev" className={styles.icons} />,
      onClick: () => dispatch(playerActions.prev()),
    },
    {
      icon: state.isPlaying ? (
        <Image src={PauseIcon} alt="Pause" className={styles.icons} />
      ) : (
        <Image src={PlayIcon} alt="Play" className={styles.icons} />
      ),
      onClick: handlePlayPause,
    },
    {
      icon: <Image src={NextIcon} alt="Next" className={styles.icons} />,
      onClick: () => dispatch(playerActions.next()),
    },
    {
      icon: (
        <Image
          src={state.repeat === "one" ? RepeatOneIcon : RepeatIcon}
          alt="Repeat"
          className={`${styles.icons2} ${
            state.repeat !== "off" ? styles.active : ""
          }`}
        />
      ),
      onClick: () => dispatch(playerActions.cycleRepeat()),
    },
  ];

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.controlBar}>
        {controls.map((c, i) => (
          <button key={i} onClick={c.onClick}>
            {c.icon}
          </button>
        ))}
      </div>

      <div className={styles.seekWrapper}>
        <span className={styles.time}>
          {formatTime(state.currentTime)}
        </span>

        <input
          type="range"
          min={0}
          max={state.duration || 0}
          step={0.01}
          value={
            isDragging
              ? tempValue ?? state.currentTime
              : state.currentTime
          }
          className={`${styles.seekInput} ${
            isDragging ? styles.showThumb : ""
          }`}
          style={
            { "--seek-progress": `${progressPercent}%` } as SeekBarStyle
          }
          onChange={e => setTempValue(Number(e.target.value))}
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={commitSeek}
        />

        <span className={styles.time}>
          {formatTime(state.duration || 0)}
        </span>
      </div>
    </div>
  );
};

export default PlayerControl;

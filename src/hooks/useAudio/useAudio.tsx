"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import songData from "@/data/songs.json";
import { playerActions } from "@/store/player/playerSlice";

export function usePlayerAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dispatch = useDispatch();
  const player = useSelector((s: RootState) => s.player);
  const songs = songData.songs;

  // ===== init audio =====
  useEffect(() => {
    audioRef.current = new Audio();
  }, []);

  // ===== load new song only when it actually changes =====
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !player.currentSongId) return;

    const song = songs.find((s) => s.id === player.currentSongId);
    if (!song) return;

    const isNewSong = audio.dataset.songId !== player.currentSongId;

    //  set new src
    if (isNewSong) {
      audio.src = song.audioUrl;
      audio.currentTime = 0;
      audio.dataset.songId = player.currentSongId;
      audio.load();
    }

    if (isNewSong || player.isPlaying) {
      audio.play().catch(() => {});
    }
  }, [player.currentSongId, player.isPlaying, songs]);

  // ===== play/pause handling =====
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (player.isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [player.isPlaying]);

  // ===== volume =====
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = player.volume;
  }, [player.volume]);

  // ===== audio events =====
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => dispatch(playerActions.setTime(audio.currentTime));
    const onMeta = () => dispatch(playerActions.setDuration(audio.duration));
    const onEnd = () => {
      if (player.repeat === "one") {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        dispatch(playerActions.next());
      }
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
    };
  }, [dispatch, player.repeat, player.currentSongId]);

  // ===== sync seek from redux =====
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (Math.abs(audio.currentTime - player.currentTime) > 0.3) {
      audio.currentTime = player.currentTime;
    }
  }, [player.currentTime]);
}

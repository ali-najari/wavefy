"use client";
import Playlist from "@/components/playlists/playlist";
import { use } from "react";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function Page({ params }: PageProps) {
  const { id } = use(params);

  return <Playlist id={id} />;
}

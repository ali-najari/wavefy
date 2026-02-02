"use client"; // only if Artist is client component
import Artist from "@/components/artists/artist";
import { use } from "react";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function Page({ params }: PageProps) {
  const { id } = use(params);

  return <Artist id={id} />;
}

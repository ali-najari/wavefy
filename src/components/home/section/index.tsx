"use client";

import { useRef, useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

type HomeSectionProps = {
  title: string;
  url:string;
  children: React.ReactNode;
};

const HomeSection = ({ url ,title, children }: HomeSectionProps) => {
  const rowRef = useRef<HTMLDivElement | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (!rowRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  const scroll = (direction: "left" | "right") => {
    if (!rowRef.current) return;

    const width = rowRef.current.clientWidth;

    rowRef.current.scrollBy({
      left: direction === "right" ? width : -width,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateScrollState();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <Link href={`/${url}`} className={styles.title}>{title}</Link>

        <div className={styles.arrows}>
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
          >
            ‹
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
          >
            ›
          </button>
        </div>
      </div>

      <div
        className={styles.row}
        ref={rowRef}
        onScroll={updateScrollState}
      >
        {children}
      </div>
    </section>
  );
};

export default HomeSection;

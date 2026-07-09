"use client";

import { motion } from "framer-motion";
import type { Short } from "@/lib/types";
import { formatCount, formatDuration } from "@/lib/format";

export default function ShortCard({ short }: { short: Short }) {
  const href = `https://www.youtube.com/shorts/${short.youtube_id}`;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4 }}
      className="group relative block overflow-hidden rounded-3xl glass"
    >
      <div className="aspect-[9/16] w-full overflow-hidden">
        {short.thumbnail_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={short.thumbnail_url}
            alt={short.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-sakura-200/60" />
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-white">
        <div className="line-clamp-2 text-sm font-medium">{short.title}</div>
        <div className="mt-1 flex items-center gap-2 text-[11px] opacity-90">
          <span>▶ {formatCount(short.view_count)}</span>
          {short.duration_seconds ? (
            <span>· {formatDuration(short.duration_seconds)}</span>
          ) : null}
        </div>
      </div>
      {short.is_featured && (
        <span className="absolute top-2 left-2 chip !bg-sakura-500 !text-white">
          ✿ Featured
        </span>
      )}
    </motion.a>
  );
}

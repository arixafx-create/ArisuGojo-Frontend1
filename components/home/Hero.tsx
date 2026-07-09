"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero({
  title,
  subtitle,
  cta,
  youtubeUrl,
}: {
  title: string;
  subtitle: string;
  cta: string;
  youtubeUrl?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pt-16 md:pt-24 pb-12">
        <div className="glass-strong rounded-[2.25rem] p-8 md:p-14 relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-sakura-300/40 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-sakura-200/50 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="chip mb-4">✿ Anime shorts creator</div>
            <h1 className="heading text-4xl md:text-6xl leading-tight text-balance">
              {title}
            </h1>
            <p className="mt-4 max-w-xl text-base md:text-lg opacity-80 text-balance">
              {subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {youtubeUrl && (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  ▶ {cta}
                </a>
              )}
              <Link href="/shorts" className="btn-outline">
                Browse Shorts
              </Link>
              <Link href="/gallery" className="btn-ghost">
                Gallery
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

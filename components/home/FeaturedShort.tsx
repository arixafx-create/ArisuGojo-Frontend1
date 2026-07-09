import type { Short } from "@/lib/types";
import { formatCount, formatDuration } from "@/lib/format";

export default function FeaturedShort({ short }: { short?: Short | null }) {
  if (!short) return null;
  return (
    <section className="mx-auto max-w-6xl px-4 mt-16">
      <div className="glass-strong rounded-3xl overflow-hidden grid md:grid-cols-2 gap-0">
        <div className="relative aspect-[9/16] md:aspect-auto md:min-h-[420px]">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${short.youtube_id}?rel=0`}
            title={short.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="chip">✿ Featured short</div>
          <h3 className="heading text-2xl md:text-3xl mt-3 text-balance">
            {short.title}
          </h3>
          {short.description && (
            <p className="mt-3 opacity-75 line-clamp-4">{short.description}</p>
          )}
          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            <span className="chip">▶ {formatCount(short.view_count)} views</span>
            {short.duration_seconds ? (
              <span className="chip">
                ⏱ {formatDuration(short.duration_seconds)}
              </span>
            ) : null}
            <span className="chip">♡ {formatCount(short.like_count)}</span>
          </div>
          <a
            href={`https://www.youtube.com/shorts/${short.youtube_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6 w-fit"
          >
            Watch on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}

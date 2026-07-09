import Link from "next/link";

export const runtime = "edge";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-20 pb-16 text-center">
      <div className="text-5xl">✿</div>
      <h1 className="heading text-4xl mt-4">Lost among the petals</h1>
      <p className="mt-2 opacity-80">
        The page you're looking for drifted off. Try one of these instead.
      </p>
      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        <Link href="/" className="btn-primary">
          Home
        </Link>
        <Link href="/shorts" className="btn-outline">
          Shorts
        </Link>
        <Link href="/gallery" className="btn-ghost">
          Gallery
        </Link>
      </div>
    </div>
  );
}

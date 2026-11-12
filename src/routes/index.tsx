import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-lanterns.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seven Lanterns — A Visual Novel" },
      { name: "description", content: "Seven Lanterns: a visual novel set beneath the colonnades of an ancient Mediterranean city. Play the demo in your browser." },
      { property: "og:title", content: "Seven Lanterns — A Visual Novel" },
      { property: "og:description", content: "Play the Seven Lanterns demo in your browser." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-svh overflow-hidden">
      <img src={hero} alt="Lanterns glowing along a marble colonnade at dusk" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-veil" />
      <section className="relative flex min-h-svh flex-col items-center justify-end px-6 pb-20 text-center sm:justify-center sm:pb-0">
        <p className="animate-rise font-display text-xs tracking-[0.5em] text-primary uppercase">A Visual Novel</p>
        <h1 className="animate-rise mt-5 text-5xl leading-tight font-semibold tracking-[0.08em] sm:text-7xl md:text-8xl" style={{ animationDelay: "0.15s" }}>
          Seven Lanterns
        </h1>
        <div className="animate-rise mx-auto mt-6 h-px w-24 bg-primary" style={{ animationDelay: "0.3s" }} />
        <p className="animate-rise mt-6 max-w-xl text-xl text-muted-foreground italic sm:text-2xl" style={{ animationDelay: "0.45s" }}>
          Seven flames burn along the colonnade. Each one keeps a secret.
        </p>
        <div className="animate-rise mt-10" style={{ animationDelay: "0.6s" }}>
          <Link to="/game" className="btn-lantern">Play Demo</Link>
        </div>
      </section>
    </main>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ExternalLink, Maximize } from "lucide-react";

export const Route = createFileRoute("/game")({
  head: () => ({
    meta: [
      { title: "Play the Demo — Seven Lanterns" },
      { name: "description", content: "Play the Seven Lanterns visual novel demo directly in your browser." },
      { property: "og:title", content: "Play the Demo — Seven Lanterns" },
      { property: "og:description", content: "Play the Seven Lanterns demo in your browser." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GamePage,
});

type Status = "checking" | "ready" | "missing";

function GamePage() {
  const gameUrl = `${import.meta.env.BASE_URL}play/index.html`;
  const frameWrap = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("checking");
  const [canFullscreen, setCanFullscreen] = useState(false);

  useEffect(() => {
    setCanFullscreen(!!document.fullscreenEnabled);
    // A Ren'Py web export's index.html mentions "renpy"; anything else (404 page) means not added yet.
    fetch(gameUrl, { cache: "no-store" })
      .then(async (r) => setStatus(r.ok && /renpy/i.test(await r.text()) ? "ready" : "missing"))
      .catch(() => setStatus("missing"));
  }, [gameUrl]);

  const goFullscreen = () => frameWrap.current?.requestFullscreen?.().catch(() => {});

  return (
    <main className="flex min-h-svh flex-col">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-8">
        <Link to="/" className="btn-ghost-bronze"><ArrowLeft className="size-4" /> Back</Link>
        <span className="hidden font-display tracking-[0.3em] text-primary uppercase sm:block">Seven Lanterns</span>
        <div className="flex gap-2">
          {status === "ready" && canFullscreen && (
            <button type="button" onClick={goFullscreen} className="btn-ghost-bronze"><Maximize className="size-4" /> Fullscreen</button>
          )}
          {status === "ready" && (
            <a href={gameUrl} target="_blank" rel="noopener" className="btn-ghost-bronze"><ExternalLink className="size-4" /> New Tab</a>
          )}
        </div>
      </header>

      <section className="flex flex-1 items-center justify-center p-3 sm:p-8">
        {/* 16:9 box limited by both viewport width and height, so the game is never stretched. */}
        <div
          ref={frameWrap}
          className="relative aspect-video w-full overflow-hidden bg-stage shadow-cinema"
          style={{ maxWidth: "min(100%, calc((100svh - 9rem) * 16 / 9))" }}
        >
          {status === "ready" && (
            <iframe src={gameUrl} title="Seven Lanterns demo" className="absolute inset-0 h-full w-full border-0" allow="fullscreen; autoplay; gamepad" allowFullScreen />
          )}
          {status === "checking" && (
            <p className="absolute inset-0 flex items-center justify-center text-muted-foreground italic">Lighting the lanterns…</p>
          )}
          {status === "missing" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <h2 className="text-xl tracking-[0.15em] text-primary sm:text-2xl">The demo is not here yet</h2>
              <p className="max-w-md text-muted-foreground">The lanterns are still being lit. Please check back soon.</p>
            </div>
          )}
        </div>
      </section>
      <p className="px-4 pb-4 text-center text-sm text-muted-foreground sm:hidden">Tip: rotate your phone to landscape for the best view.</p>
    </main>
  );
}

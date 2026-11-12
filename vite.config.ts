// @lovable.dev/vite-tanstack-config already includes TanStack Start, React, Tailwind, paths, nitro, etc.
// Do NOT add those plugins manually.
//
// Static GitHub Pages build: set GITHUB_PAGES=true and BASE_PATH=/<repo>/ (see README.md).
// That disables the server build and prerenders every page to plain HTML.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isStatic = process.env["GITHUB_PAGES"] === "true";
const base = isStatic ? process.env["BASE_PATH"] || "/" : "/";

export default defineConfig(
  isStatic
    ? {
        nitro: false,
        vite: { base },
        tanstackStart: {
          server: { entry: "server" },
          prerender: { enabled: true, crawlLinks: true, autoSubfolderIndex: true },
          pages: [{ path: "/" }, { path: "/game" }],
        },
      }
    : {
        tanstackStart: {
          // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
          server: { entry: "server" },
        },
      },
);

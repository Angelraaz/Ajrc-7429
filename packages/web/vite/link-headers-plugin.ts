import type { Plugin } from "vite";
import { readFileSync } from "node:fs";
import path from "node:path";

// Agent discovery for the homepage: Link headers (RFC 8288) and Markdown for Agents.
// Production serves the Link header from public/_headers. Markdown negotiation
// only runs here (dev and preview); production needs a platform that negotiates.
const HOMEPAGE_LINKS = '</robots.txt>; rel="describedby"; type="text/plain"';

type Req = { url?: string; headers: Record<string, string | string[] | undefined> };
type Res = { setHeader: (k: string, v: string) => void; end: (body: string) => void; statusCode: number };
type Server = { middlewares: { use: (fn: (req: Req, res: Res, next: () => void) => void) => void } };

export default function linkHeadersPlugin(): Plugin {
  const markdownPath = path.resolve(import.meta.dirname, "../public/index.md");
  const catalogPath = path.resolve(import.meta.dirname, "../public/.well-known/api-catalog");

  const addLinks = (server: Server) => {
    server.middlewares.use((req, res, next) => {
      const pathname = (req.url ?? "").split("?")[0];

      if (pathname === "/.well-known/api-catalog") {
        res.setHeader("Content-Type", "application/linkset+json");
        res.statusCode = 200;
        res.end(readFileSync(catalogPath, "utf8"));
        return;
      }

      if (pathname !== "/" && pathname !== "/index.html") return next();

      res.setHeader("Link", HOMEPAGE_LINKS);
      res.setHeader("Vary", "Accept");

      const accept = String(req.headers.accept ?? "");
      if (!accept.includes("text/markdown")) return next();

      const markdown = readFileSync(markdownPath, "utf8");
      const tokens = Math.ceil(markdown.length / 4); // rough estimate: ~4 chars per token
      res.setHeader("Content-Type", "text/markdown; charset=utf-8");
      res.setHeader("x-markdown-tokens", String(tokens));
      res.setHeader("Vary", "Accept");
      res.statusCode = 200;
      res.end(markdown);
    });
  };

  return {
    name: "link-headers",
    configureServer: addLinks,
    configurePreviewServer: addLinks,
  };
}

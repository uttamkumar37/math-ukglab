import { copyFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");
const distOpenAiDir = path.join(distDir, ".openai");
const serverDir = path.join(distDir, "server");

await mkdir(distOpenAiDir, { recursive: true });
await mkdir(serverDir, { recursive: true });
await copyFile(
  path.join(root, ".openai", "hosting.json"),
  path.join(distOpenAiDir, "hosting.json"),
);

const workerSource = `export default {
  async fetch(request, env) {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD" },
      });
    }

    const assetResponse = await env.ASSETS.fetch(request);
    if (assetResponse.status !== 404) {
      return assetResponse;
    }

    const url = new URL(request.url);
    if (url.pathname.includes(".")) {
      return assetResponse;
    }

    url.pathname = "/index.html";
    return env.ASSETS.fetch(new Request(url, request));
  },
};
`;

await writeFile(path.join(serverDir, "index.js"), workerSource);

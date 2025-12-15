// src/app/api/github-projects/readme/[name]/route.ts
import { getGitHubHeaders } from "@/lib/github-api";
import { NextResponse } from "next/server";

function decodeBase64ToUtf8(base64: string) {
  // GitHub may include newlines in base64 content
  const clean = base64.replace(/\s/g, "");

  // Node runtime
  if (typeof Buffer !== "undefined") {
    return Buffer.from(clean, "base64").toString("utf8");
  }

  // Edge runtime
  const bin = atob(clean);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ name: string }> }
) {
  const { name } = await context.params;

  const owner = "josuejero"; // or resolveGitHubUsername()
  const token = process.env.GITHUB_TOKEN ?? "";
  const url = `https://api.github.com/repos/${owner}/${name}/readme`;

  const res = await fetch(url, {
    headers: getGitHubHeaders(token, { Accept: "application/vnd.github+json" }),
    // optional: reduce GitHub calls in production
    // next: { revalidate: 60 * 60 },
  });

  if (res.status === 404) {
    return NextResponse.json({ readme: null }, { status: 200 });
  }
  if (!res.ok) {
    return NextResponse.json({ readme: null }, { status: res.status });
  }

  const data = await res.json();

  const markdown =
    data?.encoding === "base64" && typeof data?.content === "string"
      ? decodeBase64ToUtf8(data.content)
      : "";

  const excerpt = markdown
    .split(/\n\s*\n/)[0]
    .replace(/[#*`]/g, "")
    .slice(0, 200);

  return NextResponse.json({
    readme: {
      repo: name,
      path: data?.path ?? "README.md",
      excerpt,
      markdown, // <-- render THIS with react-markdown
      sourceUrl: data?.html_url ?? null,
      lastFetched: new Date().toISOString(),
    },
  });
}

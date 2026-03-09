import { NextRequest, NextResponse } from "next/server";
import { ALLOWED_HOSTS, FETCH_TIMEOUT_MS } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // SSRF protection: validate hostname
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    if (!ALLOWED_HOSTS.includes(parsedUrl.hostname as typeof ALLOWED_HOSTS[number])) {
      return NextResponse.json(
        { error: `Host not allowed. Allowed: ${ALLOWED_HOSTS.join(", ")}` },
        { status: 403 }
      );
    }

    if (parsedUrl.protocol !== "https:") {
      return NextResponse.json({ error: "Only HTTPS allowed" }, { status: 400 });
    }

    const headers: HeadersInit = {};
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(url, {
      headers,
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Fetch failed: ${res.status} ${res.statusText}` },
        { status: res.status }
      );
    }

    const content = await res.text();
    return NextResponse.json({ content });
  } catch (error) {
    if (error instanceof DOMException && error.name === "TimeoutError") {
      return NextResponse.json({ error: "Request timed out" }, { status: 504 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

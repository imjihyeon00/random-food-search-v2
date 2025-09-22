/* eslint-disable no-console */
import { promises as fs } from "fs";
import path from "path";

// ====== 설정값 ======
const SITE_URL = process.env.SITE_URL || "https://random-food-store.web.app";
const POSTS_DIR = path.resolve(process.cwd(), "src/content/posts");
const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const SITEMAP_PATH = path.join(PUBLIC_DIR, "sitemap.xml");
const RSS_PATH = path.join(PUBLIC_DIR, "rss.xml");

// 고정 페이지들 (필요시 추가/수정)
const STATIC_PATHS = [
  { loc: "/", priority: "1.0" },
  { loc: "/how-to", priority: "0.8" },
  { loc: "/news", priority: "0.7" },
  { loc: "/privacy", priority: "0.5" },
  { loc: "/terms", priority: "0.5" },
];

// ====== 유틸 ======
function escapeXml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toISODate(d) {
  return new Date(d).toISOString().slice(0, 10); // YYYY-MM-DD
}

function toRFC822(d) {
  // RSS pubDate용 (RFC-822/RFC-1123)
  // 예: Mon, 22 Sep 2025 09:00:00 +0900
  const date = new Date(d);
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const pad = (n) => (n < 10 ? `0${n}` : `${n}`);

  const wd = days[date.getUTCDay()];
  const dd = pad(date.getUTCDate());
  const mm = months[date.getUTCMonth()];
  const yyyy = date.getUTCFullYear();
  const hh = pad(date.getUTCHours());
  const mi = pad(date.getUTCMinutes());
  const ss = pad(date.getUTCSeconds());
  // 기본은 UTC로 표기 (+0000). 한국 시간으로 표시하고 싶다면 아래 오프셋 계산 사용.
  // 여기서는 간단하게 +0900로 변환하려면:
  // const kst = new Date(date.getTime() + 9*60*60*1000);
  // ...로 다시 포맷. 하지만 UTC 그대로도 RSS는 유효.
  return `${wd}, ${dd} ${mm} ${yyyy} ${hh}:${mi}:${ss} +0000`;
}

// 매우 단순한 Frontmatter 파서 (--- ... --- 블록만)
function parseFrontmatter(raw) {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  let attrs = {};
  let body = raw;
  if (fmMatch) {
    const fm = fmMatch[1];
    body = raw.slice(fmMatch[0].length).trim();
    fm.split("\n").forEach((line) => {
      const idx = line.indexOf(":");
      if (idx > -1) {
        const k = line.slice(0, idx).trim();
        let v = line.slice(idx + 1).trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
          v = v.slice(1, -1);
        }
        attrs[k] = v;
      }
    });
  }
  return { attrs, body };
}

function makeExcerpt(md = "", max = 160) {
  const plain = md
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")  // 이미지 제거
    .replace(/\[[^\]]*\]\([^)]+\)/g, "")   // 링크 텍스트만
    .replace(/[`*_>#-]/g, "")              // 마크다운 기호 단순 제거
    .replace(/\n+/g, " ")
    .trim();
  return plain.length > max ? plain.slice(0, max) + "…" : plain;
}

// ====== 메인 로직 ======
async function readPosts() {
  try {
    const files = await fs.readdir(POSTS_DIR);
    const mdFiles = files.filter((f) => f.endsWith(".md"));

    const posts = [];

    for (const file of mdFiles) {
      const full = path.join(POSTS_DIR, file);
      const raw = await fs.readFile(full, "utf8");
      const stat = await fs.stat(full);
      const { attrs, body } = parseFrontmatter(raw);

      const slug = file.replace(/\.md$/, "");
      const title = attrs.title || slug;
      const date = attrs.date || toISODate(stat.mtime);
      const cover = attrs.cover || "";
      const excerpt = attrs.excerpt || makeExcerpt(body, 160);

      posts.push({ slug, title, date, cover, excerpt });
    }

    // 최신 글이 먼저 오도록 날짜 내림차순
    posts.sort((a, b) => (a.date < b.date ? 1 : -1));
    return posts;
  } catch (e) {
    console.warn("[feeds] posts read failed:", e.message);
    return [];
  }
}

function buildSitemapXml({ posts }) {
  const today = toISODate(new Date());
  const urls = [];

  // 정적 경로
  for (const p of STATIC_PATHS) {
    urls.push(
      `  <url>
    <loc>${SITE_URL.replace(/\/+$/, "")}${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${p.priority}</priority>
  </url>`
    );
  }

  // 포스트 경로
  for (const post of posts) {
    urls.push(
      `  <url>
    <loc>${SITE_URL.replace(/\/+$/, "")}/news/${encodeURIComponent(post.slug)}</loc>
    <lastmod>${toISODate(post.date)}</lastmod>
    <priority>0.6</priority>
  </url>`
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
}

function buildRssXml({ posts }) {
  const lastBuildDate = toRFC822(new Date());
  const channelItems = posts
    .map((p) => {
      const title = escapeXml(p.title);
      const link = `${SITE_URL.replace(/\/+$/, "")}/news/${encodeURIComponent(p.slug)}`;
      const pubDate = toRFC822(p.date);
      const description = escapeXml(p.excerpt || "");
      return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>오늘 뭐 먹지? 소식</title>
    <link>${SITE_URL}</link>
    <description>업데이트와 음식 관련 글</description>
    <language>ko</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${channelItems ? channelItems + "\n" : ""}  </channel>
</rss>
`;
}

async function ensurePublicDir() {
  try {
    await fs.mkdir(PUBLIC_DIR, { recursive: true });
  } catch {}
}

async function main() {
  await ensurePublicDir();

  const posts = await readPosts();

  const sitemap = buildSitemapXml({ posts });
  await fs.writeFile(SITEMAP_PATH, sitemap, "utf8");
  console.log(`[feeds] wrote ${path.relative(process.cwd(), SITEMAP_PATH)}`);

  const rss = buildRssXml({ posts });
  await fs.writeFile(RSS_PATH, rss, "utf8");
  console.log(`[feeds] wrote ${path.relative(process.cwd(), RSS_PATH)}`);
}

main().catch((e) => {
  console.error("[feeds] failed:", e);
  process.exit(1);
});

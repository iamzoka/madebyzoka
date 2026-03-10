import Link from "next/link";
import { siteMeta } from "@/lib/siteMeta";

export default function SiteFooter() {
  return (
    <footer className="l-site-footer u-grid">
      <p className="c-footer-copy">Made by me, personally.</p>

      <nav className="c-site-nav">
        <Link href="/about" title="About">About</Link>
        <Link href="/uses" title="Uses">Uses</Link>
        <Link href="/blogroll" title="Blogroll">Blogroll</Link>
        <Link href="/rss.xml" title="RSS feed for articles">RSS</Link>
        <a href={siteMeta.githubUrl} title="GitHub">GitHub</a>
        <a href={siteMeta.linkedinUrl} title="LinkedIn">LinkedIn</a>
        <a href={siteMeta.blueskyUrl} title="Bluesky">Bluesky</a>
      </nav>
    </footer>
  );
}
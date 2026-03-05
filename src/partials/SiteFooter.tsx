import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="l-site-footer u-grid">
      <p className="c-footer-copy">Made by me, personally.</p>

      <nav className="c-site-nav">
        <Link href="/about" title="About">About</Link>
        <Link href="/uses" title="Uses">Uses</Link>
        <Link href="/blogroll" title="Blogroll">Blogroll</Link>
        <Link href="/rss.xml" title="RSS feed for articles">RSS</Link>
        <a href="https://github.com/iamzoka" title="GitHub">GitHub</a>
        <a href="https://linkedin.com/in/iamzoka/" title="LinkedIn">LinkedIn</a>
        <a href="https://bluesky.app/profile/iamzoka.bsky.social" title="Bluesky">Bluesky</a>
      </nav>
    </footer>
  );
}
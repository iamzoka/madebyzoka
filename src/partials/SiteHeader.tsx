import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="l-site-header u-grid">
      <Link href="/" title="Homepage" className="c-site-logo">Zoran <strong>Zlokapa</strong></Link>

      <nav className="c-site-nav">
        <Link href="/articles" title="Articles">Articles</Link>
        <Link href="/resume" title="Professional resume">Resume</Link>
        <Link href="/notes" title="Short notes and thoughts">Notes</Link>
        <Link href="/ideas" title="Ideas">Ideas</Link>
      </nav>
    </header>
  );
}
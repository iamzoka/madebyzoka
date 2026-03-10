import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Ideas",
};

export default async function Page() {
  return (
    <div className="c-page c-page--ideas-list">
      <header className="c-page__header">
        <div className="u-container">
          <h1 className='c-page__title'>Ideas & projects</h1>

          <div className="c-page__summary">
            <p>Showcase of the projects and ideas I&apos;m always thinking about and tinkering with.</p>
            <p>The guideline is simple: have an idea, share it, build it or talk about it. Like they say, ideas are cheap, execution is everything. And if I don&apos;t have time to do it, maybe somebody else will.</p>
          </div>
        </div>
      </header>

      <div className="c-page__body">
        <div className="u-container">
          <div className="c-projects-list c-cards-list">
            <div className="c-project c-card c-card--horizontal">
              <div className="c-card__content">
                <h2>Book Shelf</h2>
                <p>Couple of years ago, I decided to start reading more. After a few books I wanted to start 
                  keeping track of what I read and what I wanted to read next.</p>
                <p>It started with a simple text file, but once I passed 10 books it became a bit cumbersome. 
                  I want to create a something a bit more user-friendly.</p>
                <p>I know, I know, there are a lot of apps out there that do this, but this is my take on it.</p>
              </div>

              <Image className="c-card__image" width={500} height={500} src="/images/bookshelf-app-temp-thumb.jpg" alt="Book Shelf" />
            </div>

            <div className="c-project c-card c-card--horizontal">
              <div className="c-card__content">
                <h2>Lawnscaping business</h2>
                <p>Yes, I plan on starting a lawnscaping business. I&apos;m not sure when, but I&apos;m sure it will happen.</p>
                <p>Something to do to get away from computers.</p>
              </div>

              <Image className="c-card__image" width={500} height={500} src="/images/lawnscaping-biz-temp-thumb.jpg" alt="Lawnscaping business" />
            </div>

            <div className="c-project c-card c-card--horizontal">
              <div className="c-card__content">                
                <h2>Web development studio</h2>
                <p>Web sites aren&apos;t supposed to be complicated. Business around them shouldn&apos;t be complicated either. Complex, maybe, but not complicated.</p>
                <p>I&apos;m trying to create something simple and straightforward.</p>
              </div>

              <Image className="c-card__image" width={500} height={500} src="/images/refreshd-biz-temp-thumb.jpg" alt="Refresh'd studio" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
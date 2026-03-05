import Image from "next/image";

export default async function Page() {
  return (
    <article className="c-page c-page--about">
      <header className="c-page__header">
        <div className="u-container">
          <h1 className='c-page__title'>Not so serious version of my biography</h1>
          <div className="c-page__summary">
            <p>My first browser was Netscape Navigator. I was there when the web was new, 
              strange and weird and I fell in love with it right away.</p>
          </div>
        </div>
      </header>

      <div className="c-page__body u-container u-grid">
        <Image className="c-page__image u-rounded" width={500} height={500} src="/images/profile-image-lg-bw.png" alt="Zoran Zlokapa profile image" />

        <div className="c-page__content">
          <h2>Work</h2>

          <p>With over 15 years of professional experience in designing, developing and producing web interfaces, you might say I&apos;ve seen some stuff. 
            I started building websites with <code>&lt;table&gt;</code>s, then <code>float</code>s and now with <code>flex</code> and 
            <code>grid</code>. Even after all these years in the field, I&apos;m still excited about all the things you can do with and on 
            the Interwebs.</p>

          <p>I&apos;m here to help people start or improve their online journey and help them reach and talk to their customers more easily. 
            I say people and not clients or companies because I&apos;m not a salesperson. I like to get to know people and understand their 
            needs and help them achieve their goals. I&apos;m not here to sell you anything, I&apos;m here to help you build something that 
            both of us can be proud of.</p>

          <p>Currently, I&apos;m working as a software engineer at <a href="https://epam.com" title="EPAM Systems">EPAM Systems</a>, where we 
          build large-scale systems helping millions of people around the world.</p>

          <p>I used to teach at <a href="https://vivifyacademy.com" title="Vivify Academy">Vivify Academy</a>. I created curriculum and I 
            taught basics of aesthetics, design and HTML and CSS.</p>
        </div>

        <Image className="c-page__image u-rounded" width={500} height={500} src="/images/suzuki-intruder-bw.png" alt="My Suzuki Intruder motorcycle" />

        <div className="c-page__content">
          <h2>Personal life</h2>

          <p>Up until recently, I was just a web designer and world traveler. That was all I knew how to do.</p>

          <p>It was an end of a decade. Covid restrictions were loosening up and I had what some people call a mid-life crisis 
            but I call it a wake-up call. I got tattooed and bought a motorcycle. Yeah, a real grown-up thing to do, I know. I started 
            working-out again and looking out for myself both physically and mentally. I wanted to leave all the bad things behind me 
            and start fresh.</p>

          <p>Couple of years later, I met Her. I knew she was the one the moment she climbed on my motorcycle even before I got a chance to tell 
            her that I never rode with a passenger before. A year later, our son was born and I cannot wait for him to grow up and 
            ride with me.</p>

          <p>Sometimes I day-dream about writing about all the cool and weird stuff that I think about like empathy, good design practices, 
            interface usability and also about things like what would happen if we could clone ourselves. That&apos;s one of the main reasons 
            I started this site, to keep you updated on that last thing.</p>
        </div>
      </div>
    </article>
  );
}
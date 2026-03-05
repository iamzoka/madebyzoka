import { siteMeta } from "@/lib/siteMeta";

export default async function Page() {
  return (
    <>
      <article className="c-page c-page--resume">
        <header className="c-page__header">
          <div className="u-container">
            <h1>Serious Resume of <strong>Web developer Zoran Zlokapa</strong></h1>

            <ul className="c-contact-info">
              <li>
                Banja Luka, BH
              </li>
              <li>
                <a href={`mailto:${siteMeta.email}`} title="Email">{siteMeta.email}</a>
              </li>
              <li>
                <a href={siteMeta.githubUrl} title="GitHub profile">GitHub</a>
              </li>
              <li>
                <a href={siteMeta.linkedinUrl} title="LinkedIn">LinkedIn</a>
              </li>
            </ul>
          </div>
        </header>

        <div className="c-page__body">
          <section className="c-section c-section--experience">
            <div className="u-container u-grid">
              <h2 className="c-section__title">Work &amp; Experience</h2>

              <div className="c-experience-list">
                <h3>Software Engineer, EPAM Systems</h3>
                <p className="c-date-line">2022 - Now</p>
                <p>Working on development of large-scale web applications, ensuring high performance and maintainability. 
                  Designing and implementing complex UI solutions using React, TypeScript, Tailwind and other UI libraries. Driving the adoption 
                  of best practices in accessibility and usability, making applications inclusive.</p>

                  <h3>Web Developer, Vivify Ideas</h3>
                  <p className="c-date-line">2014 - 2022</p>
                  <p>I developed and maintained enterprise-grade applications using React, ReactNative, Vue and other frameworks. Built 
                    and maintained scalable design systems, improving development efficiency across teams. 
                    Spearheaded frontend performance optimizations, reducing load times and improving user experience. Worked closely 
                    with designers and product teams to ensure perfect UI implementations. Led frontend feature 
                    development, taking ownership from concept to deployment.</p>

                  <h3>UX Designer, Media Matrix</h3>
                  <p className="c-date-line">2011 - 2014</p>
                  <p>Designed and optimized user interfaces for high-traffic websites, improving engagement and retention. 
                    Conducted usability testing and applied accessibility improvements for a better user experience.</p>

                  <h3>Freelance web designer & developer</h3>
                  <p className="c-date-line">2003 - 2011</p>
                  <p>I&apos;ve been designing and developing company web sites using WordPress. 
                    I&apos;ve built custom WordPress themes from scratch using HTML, CSS and jQuery. 
                    Built and maintained web applications with focus on usability and design consistency. 
                    Led frontend projects, ensuring high-quality delivery and alignment with business needs.</p>
              </div>
            </div>
          </section>

          <section className="c-section c-section--skills">
            <div className="u-container u-grid">
              <h2 className="c-section__title">Tools &amp; Technologies</h2>

              <div className="c-skills-list">
                <h3>Languages</h3>
                <p>HTML, CSS, JavaScript, TypeScript</p>

                <h3>Frameworks & libraries</h3>
                <p>React, Next.js, GSAP, Tailwind, Material UI</p>

                <h3>Tools</h3>
                <p>Git, Visual Studio Code, NPM, Figma, Adobe Photoshop, Adobe Illustrator</p>
              </div>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
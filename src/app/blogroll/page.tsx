import type { Metadata } from "next";
import { getBlogsByCategory } from "@/lib/blogroll";
import { BlogLink } from "@/lib/types";
import ContentAlert from "@/partials/ContentAlert";

export const metadata: Metadata = {
  title: "Blogroll",
};

export default async function Page() {
  const designBlogs = getBlogsByCategory("Design & Inspiration");
  const developmentBlogs = getBlogsByCategory("Development");
  const newsBlogs = getBlogsByCategory("News");
  const writingBlogs = getBlogsByCategory("Writing");
  const magazinesBlogs = getBlogsByCategory("Magazines");

  const renderBlogList = (blogs: BlogLink[]) => {
    return (
      <ul className="c-blogroll-list">
        {blogs.map((blog) => (
          <li className="c-blogroll__item" key={blog.url}>
            <p><strong><a href={blog.url} title={blog.title}>{blog.title}</a></strong></p>
            {blog.description && <p>{blog.description}</p>}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="c-page c-page--blogroll">
      <header className="c-page__header">
        <div className="u-container">
          <h1 className='c-page__title'>Blogroll</h1>

          <div className="c-page__summary">
            <p>There are so many awesome people out there doing some really great stuff. Heck, I grew up reading some of these blogs.</p>
          </div>
        </div>
      </header>

      <div className="c-page__body">
        <div className="u-container">
          <ContentAlert />
        </div>

        <div className="u-container u-grid">
          <div className="u-grid--half">
            <h2>Writing</h2>
            {renderBlogList(writingBlogs)}
          </div>

          <div className="u-grid--half">
            <h2>Magazines</h2>
            {renderBlogList(magazinesBlogs)}
          </div>

          <div className="u-grid--half">
            <h2>News</h2>
            {renderBlogList(newsBlogs)}
          </div>

          <div className="u-grid--half">
            <h2>Inspiration</h2>
            {renderBlogList(designBlogs)}
          </div>

          <div className="u-grid--half">
            <h2>Developers</h2>
            {renderBlogList(developmentBlogs)}
          </div>
        </div>
      </div>
    </div>
  );
}
import "./BlogCard.css";

const BlogCard = ({ blog }) => {
  const { headline, datetime, summary, url, image, source } = blog;

  // Convert timestamp to date
  const date = new Date(datetime * 1000).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="blog-card">
      {image && <img className="blog-image" src={image} alt={headline} />}
      <div className="blog-content">
        <h3 className="blog-headline">{headline}</h3>
        <div className="blog-meta">
          <span className="blog-date">{date}</span>
          {source && <span className="blog-source">{source}</span>}
        </div>
        <p className="blog-summary">{summary}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="read-more"
        >
          Read full post
        </a>
      </div>
    </div>
  );
};

export default BlogCard;

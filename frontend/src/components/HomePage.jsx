import { useLoaderData } from "react-router-dom";
import BlogCard from "./BlogCard";
import "./HomePage.css";
import { useState } from "react";

const numberOfPosts = 6;
const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const newsData = useLoaderData().data;

  const allOverPosts = newsData.length;
  const totalPost = Math.ceil(allOverPosts / numberOfPosts);
  const start = currentPage * numberOfPosts;
  const end = start + numberOfPosts;

  const backButton = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const nextButton = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPost - 1));
  };

  return (
    <div className="home-page">
      <h1>InvestIQ Posts</h1>

      <div className="blog-cards">
        {newsData.slice(start, end).map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={backButton} disabled={currentPage === 0}>
          Back
        </button>
        {[...Array(totalPost).keys()].map((value) => (
          <span
            key={value}
            onClick={() => setCurrentPage(value)}
            style={{
              fontWeight: currentPage === value ? "bold" : "normal",
              textDecoration: currentPage === value ? "underline" : "none",
              cursor: "pointer",
            }}
          >
            {value + 1}
          </span>
        ))}
        <button onClick={nextButton} disabled={currentPage === totalPost - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;

export const blogLoader = async () => {
  const res = await fetch("http://localhost:8000/posts/");
  if (!res.ok) {
    throw Error("Failed to fetch Api");
  }
  return await res.json();
};

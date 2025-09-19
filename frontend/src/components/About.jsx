import { useLoaderData } from "react-router-dom";
import "./About.css";
const About = () => {
  const aboutContent = useLoaderData().data[0];

  return (
    <div className="about-page">
      <h1>{aboutContent.title}</h1>
      <p>{aboutContent.content}</p>
      <em>&copy; {aboutContent.copyright}</em>
    </div>
  );
};

export default About;

export const aboutLoader = async () => {
  const res = await fetch(
    "https://portfolio-management-backend.onrender.com/about/"
  );
  if (!res.ok) {
    throw Error("Failed to fetch Api");
  }
  return await res.json();
};

import { useState } from "react";
import "./App.css";
import status_data from "./data/status.json";
import timeline_data from "./data/timeline.json";
import profileImage from "./images/profile.jpg";
import { FaGithub, FaPen, FaLinkedin, FaDice } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";

interface TimelineItem {
  event: string;
  date: string;
  description: string;
}

const timeline: TimelineItem[] = timeline_data;
const courses = status_data.filter((d) => d.title == "courses")[0].data;
const projects = status_data.filter((d) => d.title == "projects")[0].data;
const hobbies = status_data.filter((d) => d.title == "hobbies")[0].data;

const links = [
  { name: "GitHub", url: "https://github.com/sophiasharif", icon: FaGithub },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/sophia-sharif/",
    icon: FaLinkedin,
  },
  {
    name: "Resume",
    url: "https://github.com/sophiasharif/resume",
    icon: IoDocumentText,
  },
  { name: "Class Notes", url: "https://notes.sophiasharif.com/", icon: FaPen },
];

const ICON_SIZE = "2em";

function Timeline() {
  const [item, setItem] = useState(0);
  const totalItems = timeline.length;
  const currentItem = timeline[item];
  return (
    <div id="timeline">
      <h2>What I've been up to...</h2>
      <h3>{currentItem.event}</h3>
      <p>{currentItem.date}</p>
      <div dangerouslySetInnerHTML={{ __html: currentItem.description }}></div>
      <div className="pagination">
        <button
          onClick={() => {
            if (item > 0) {
              setItem(item - 1);
            }
          }}
        >
          ◀
        </button>
        <span>
          Item {item + 1} of {totalItems}
        </span>
        <button
          onClick={() => {
            if (item < totalItems - 1) {
              setItem(item + 1);
            }
          }}
        >
          ▶
        </button>
        <button onClick={() => setItem(Math.floor(Math.random() * totalItems))}>
          <FaDice size={ICON_SIZE} />
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <section id="about-me">
        <h1>Sophia Sharif</h1>
        <div id="links">
          {links.map((link) => (
            <a
              href={link.url}
              target="_blank"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <link.icon size={ICON_SIZE} />
            </a>
          ))}
        </div>
        <img src={profileImage} alt="Profile" />
        <div id="courses">
          <h2>What I'm learning this quarter...</h2>
          {courses.map((course) => (
            <p>{course}</p>
          ))}
        </div>
        <div id="projects">
          <h2>What I'm working on...</h2>
          {projects.map((project) => (
            <p>{project}</p>
          ))}
        </div>
        <div id="hobbies">
          <h2>What I'm involved in...</h2>
          {hobbies.map((hobby) => (
            <p>{hobby}</p>
          ))}
        </div>
        <Timeline />
      </section>
    </>
  );
}

export default App;

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

interface StatusItem {
  title: string;
  description: string;
}

const timeline: TimelineItem[] = timeline_data;
const courses = status_data.filter((d) => d.type == "courses")[0].data;
const projects = status_data.filter((d) => d.type == "projects")[0].data;
const hobbies = status_data.filter((d) => d.type == "hobbies")[0].data;

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

function Status({
  section,
  header,
  items,
}: {
  section: string;
  header: string;
  items: StatusItem[];
}) {
  return (
    <div id={section}>
      <h2>{header}</h2>
      {items.map((item) => (
        <div>
          <h4>{item.title}</h4>
          <p className="itemDescription">
            <span>{item.description}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

function AboutMe() {
  return (
    <section id="about-me">
      <h1>Sophia Sharif</h1>
      <p>
        Hey, I'm Sophia! I'm a CS student at UCLA finishing off my sophomore
        year. After that, I'll be heading to New York to work at Palantir as a
        Software Engineer intern, where I'll be working on their Foundry
        platform!
      </p>
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
    </section>
  );
}

function App() {
  return (
    <>
      <AboutMe />
      <img src={profileImage} alt="Profile" />
      <Status section="courses" items={courses} header="What I'm learning..." />
      <Status
        section="hobbies"
        items={hobbies}
        header="What I'm involved in..."
      />
      <Status
        section="projects"
        items={projects}
        header="What I'm working on..."
      />
      <Timeline />
    </>
  );
}

export default App;

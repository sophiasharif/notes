import { useEffect, useState } from "react";
import "./App.css";
import status_data from "./data/status.json";
import timeline_data from "./data/timeline.json";
import profileImage from "./images/profile.jpg";
import { FaGithub, FaPen, FaLinkedin, FaDice } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import anime from "animejs/lib/anime.es.js";
import Background from "./Background";

interface TimelineItem {
  event: string;
  date: string;
  description: string;
}

interface StatusItem {
  title: string;
  description: string;
}

const ICON_SIZE = "1.75rem";

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

function Timeline() {
  const [item, setItem] = useState(0);
  const totalItems = timeline.length;
  const currentItem = timeline[item];
  return (
    <div id="timeline">
      <h2>What I've been up to...</h2>
      <h4>{currentItem.event}</h4>
      <p className="subtitle">{currentItem.date}</p>
      <div
        dangerouslySetInnerHTML={{ __html: currentItem.description }}
        id="timeline-content"
      ></div>
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
    <div id={section} className="status">
      <h2>{header}</h2>
      {items.map((item) => (
        <div key={item.title}>
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
  useEffect(() => {
    anime.timeline().add({
      targets: ".letter",
      translateY: ["1em", 0],
      translateX: [".5em", 0],
      rotateZ: [180, 0],
      duration: 1000,
      easing: "easeOutExpo",
      delay: anime.stagger(50),
    });
  }, []);
  return (
    <div id="about-me">
      <div>
        <h1 id="name">
          <span className="letter-wrapper">
            {"Sophia".split("").map((l, i) => (
              <span className="letter" key={i}>
                {l}
              </span>
            ))}{" "}
            {"Sharif".split("").map((l, i) => (
              <span className="letter" key={i}>
                {l}
              </span>
            ))}
          </span>
        </h1>
        <p className="name-subtitle">Click anywhere for some color!</p>
      </div>
      <img src={profileImage} alt="Profile" id="profile-image" />
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
            key={link.name}
          >
            <link.icon size={ICON_SIZE} />
          </a>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <div id="app">
        <AboutMe />
        <section id="content">
          <Status
            section="courses"
            items={courses}
            header="What I'm learning..."
          />
          <Status
            section="projects"
            items={projects}
            header="What I'm working on..."
          />
          <Status
            section="hobbies"
            items={hobbies}
            header="What I'm involved in..."
          />
          <Timeline />
        </section>
      </div>
      <Background />
    </>
  );
}

export default App;

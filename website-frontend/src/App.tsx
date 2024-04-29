import "./App.css";
import status_data from "./data/status.json";
import timeline_data from "./data/timeline.json";

interface TimelineItem {
  event: string;
  date: string;
  description: string;
}

const timeline: TimelineItem[] = timeline_data;
const courses = status_data.filter((d) => d.title == "courses")[0].data;
const projects = status_data.filter((d) => d.title == "projects")[0].data;
const hobbies = status_data.filter((d) => d.title == "hobbies")[0].data;

function App() {
  return (
    <>
      <section id="about-me">
        <h1>Sophia Sharif</h1>
        <div id="courses">
          {courses.map((course) => (
            <p>{course}</p>
          ))}
        </div>
        <div id="projects">
          {projects.map((project) => (
            <p>{project}</p>
          ))}
        </div>
        <div id="hobbies">
          {hobbies.map((hobby) => (
            <p>{hobby}</p>
          ))}
        </div>
      </section>
    </>
  );
}

export default App;

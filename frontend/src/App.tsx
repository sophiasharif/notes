import "./App.css";
import getNotes from "./hooks/getNotes";
import { useLoaderData } from "react-router-dom";

console.log(await getNotes());

function Note({ note }: { note: Note }) {
  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.date.toDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: note.content }} />
    </div>
  );
}

function App() {
  const notes = useLoaderData() as Note[];

  return (
    <div>
      Hello World!
      <ul>
        {notes.map((note) => (
          <Note note={note} />
        ))}
      </ul>
    </div>
  );
}

export default App;

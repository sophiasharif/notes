import "./App.css";
import { getNotes } from "./hooks/getNotes";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

export async function loader() {
  return getNotes();
}

function Note({ note }: { note: Note }) {
  return (
    <div>
      <Link to={`/notes/${note.id}`}> {note.title} </Link>
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

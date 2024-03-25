import "./App.css";
import { getNotes } from "./hooks/getNotes";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

export async function loader() {
  return getNotes();
}

function Note({ note }: { note: Note }) {
  const date = `${note.date.getMonth() + 1}/${note.date.getDate()}/${note.date
    .getFullYear()
    .toString()
    .slice(-2)}`;
  const tags = note.tags.join(", ");
  return (
    <div className="note">
      <span className="date">{date}</span>
      <span className="title">
        <Link to={`/notes/${note.id}`}> {note.title} </Link>
      </span>
      <span className="tags">{tags}</span>
      <div className="summary">{note.summary}</div>
    </div>
  );
}

function LatestNotes() {
  const notes = useLoaderData() as Note[];
  return (
    <div id="latest-notes">
      <h1>Latest Notes</h1>
      {notes.map((note) => (
        <Note note={note} />
      ))}
    </div>
  );
}

function App() {
  return (
    <>
      <LatestNotes />
    </>
  );
}

export default App;
